import React from 'react';
import { useTranslation } from 'react-i18next';

import Button from '../Button/Button';
import type { Offer, Order, PaymentMethod } from '../../../types/checkout';
import IconButton from '../IconButton/IconButton';
import FormFeedback from '../FormFeedback/FormFeedback';
import { formatPrice } from '../../utils/formatting';
import Close from '../../icons/Close';
import DialogBackButton from '../DialogBackButton/DialogBackButton';
import PayPal from '../../icons/PayPal';
import CreditCard from '../../icons/CreditCard';
import LoadingOverlay from '../LoadingOverlay/LoadingOverlay';

import styles from './CheckoutForm.module.scss';

type Props = {
  paymentMethodId?: number;
  onBackButtonClick: () => void;
  paymentMethods?: PaymentMethod[];
  onPaymentMethodChange: React.ChangeEventHandler<HTMLInputElement>;
  onCouponFormSubmit: React.FormEventHandler<HTMLFormElement>;
  onCouponInputChange: React.ChangeEventHandler<HTMLInputElement>;
  onRedeemCouponButtonClick: () => void;
  onCloseCouponFormClick: () => void;
  couponFormOpen: boolean;
  couponFormError?: string;
  couponFormApplied?: boolean;
  couponFormSubmitting?: boolean;
  couponInputValue: string;
  order: Order;
  offer: Offer;
  renderPaymentMethod?: () => JSX.Element | null;
  submitting: boolean;
};

const CheckoutForm: React.FC<Props> = ({
  paymentMethodId,
  paymentMethods,
  order,
  offer,
  onBackButtonClick,
  onPaymentMethodChange,
  couponFormOpen,
  couponInputValue,
  couponFormError,
  couponFormApplied,
  couponFormSubmitting,
  onCouponInputChange,
  onCloseCouponFormClick,
  onCouponFormSubmit,
  onRedeemCouponButtonClick,
  renderPaymentMethod,
  submitting,
}) => {
  const { t } = useTranslation('account');

  const getOfferPeriod = () => {
    // t('periods.day')
    // t('periods.week')
    // t('periods.month')
    // t('periods.year')
    return offer ? t(`periods.${offer.period}`) : '';
  };

  const getFreeTrialText = (offer: Offer) => {
    if (offer.freeDays > 0) {
      return t('checkout.days_trial', { count: offer.freeDays });
    } else if (offer.freePeriods) {
      // t('periods.day')
      // t('periods.week')
      // t('periods.month')
      // t('periods.year')
      const period = t(`periods.${offer.period}`, { count: offer.freePeriods });

      return t('checkout.periods_trial', { count: offer.freePeriods, period });
    }

    return null;
  };

  const cardPaymentMethod = paymentMethods?.find((method) => method.methodName === 'card');
  const paypalPaymentMethod = paymentMethods?.find((method) => method.methodName === 'paypal');

  return (
    <div>
      <DialogBackButton onClick={onBackButtonClick} />
      <h2 className={styles.title}>{t('checkout.payment_method')}</h2>
      <div className={styles.order}>
        <div className={styles.orderInfo}>
          <p className={styles.orderTitle}>{offer.period === 'month' ? t('checkout.monthly') : t('checkout.yearly')}</p>
          {order.discount.type === 'trial' ? <p className={styles.orderBillingDate}>{getFreeTrialText(offer)}</p> : null}
        </div>
        <div className={styles.orderPrice}>
          <span>{formatPrice(offer.customerPriceInclTax, order.currency, offer.customerCountry)}</span>
          <small>/{getOfferPeriod()}</small>
        </div>
      </div>
      <div className={styles.couponForm}>
        {couponFormOpen ? (
          <form onSubmit={onCouponFormSubmit} noValidate>
            <div className={styles.redeemCoupon}>
              <IconButton aria-label="Close coupon form" onClick={onCloseCouponFormClick}>
                <Close />
              </IconButton>
              <input
                className={styles.couponInput}
                name="couponCode"
                type="text"
                placeholder="Coupon code"
                value={couponInputValue}
                onChange={onCouponInputChange}
              />
              <Button variant="outlined" label="Apply" type="submit" disabled={couponFormSubmitting} />
            </div>
            {couponFormError ? <FormFeedback variant="error">{couponFormError}</FormFeedback> : null}
            {couponFormApplied ? <FormFeedback variant="success">{t('checkout.coupon_applied')}</FormFeedback> : null}
          </form>
        ) : (
          <Button variant="outlined" label={t('checkout.redeem_coupon')} onClick={onRedeemCouponButtonClick} />
        )}
      </div>
      <div>
        <table className={styles.orderTotals}>
          <tbody>
            {order.discount.applied && order.discount.type === 'coupon' ? (
              <tr>
                <td className={styles.couponCell}>
                  {t('checkout.coupon_discount')}
                  <br />
                  <small>
                    (
                    {t('checkout.discount_period', {
                      count: order.discount.periods,
                      period: t(`periods.${offer.period}`, { count: order.discount.periods }),
                    })}
                    )
                  </small>
                </td>
                <td>{formatPrice(-order.priceBreakdown.discountAmount * (1 + order.taxRate), order.currency, offer.customerCountry)}</td>
              </tr>
            ) : null}
            {order.discount.applied && order.discount.type === 'trial' ? (
              <tr>
                <td className={styles.couponCell}>{t('checkout.free_trial_discount')}</td>
                <td>{formatPrice(-offer.customerPriceInclTax, order.currency, offer.customerCountry)}</td>
              </tr>
            ) : null}
            <tr>
              <td>{t('checkout.payment_method_fee')}</td>
              <td>{formatPrice(order.priceBreakdown.paymentMethodFee, order.currency, offer.customerCountry)}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td>{t('checkout.total_price')}</td>
              <td>{formatPrice(order.totalPrice, order.currency, offer.customerCountry)}</td>
            </tr>
            <tr>
              <td>{t('checkout.applicable_tax', { taxRate: Math.round(order.taxRate * 100) })}</td>
              <td>{formatPrice(order.priceBreakdown.taxValue, order.currency, offer.customerCountry)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <hr className={styles.divider} />
      {order.requiredPaymentDetails ? (
        <div className={styles.paymentMethods}>
          {cardPaymentMethod ? (
            <div className={styles.paymentMethod}>
              <input
                className={styles.radio}
                type="radio"
                name="paymentMethod"
                value={cardPaymentMethod.id}
                id="card"
                checked={paymentMethodId === cardPaymentMethod.id}
                onChange={onPaymentMethodChange}
              />
              <label className={styles.paymentMethodLabel} htmlFor="card">
                <CreditCard /> {t('checkout.credit_card')}
              </label>
            </div>
          ) : null}
          {paypalPaymentMethod ? (
            <div className={styles.paymentMethod}>
              <input
                className={styles.radio}
                type="radio"
                name="paymentMethod"
                value={paypalPaymentMethod.id}
                id="paypal"
                checked={paymentMethodId === paypalPaymentMethod.id}
                onChange={onPaymentMethodChange}
              />
              <label className={styles.paymentMethodLabel} htmlFor="paypal">
                <PayPal /> {t('checkout.paypal')}
              </label>
            </div>
          ) : null}
        </div>
      ) : null}
      <div className={styles.paymentDetails}>{renderPaymentMethod ? renderPaymentMethod() : null}</div>
      {submitting && <LoadingOverlay transparentBackground inline />}
    </div>
  );
};

export default CheckoutForm;

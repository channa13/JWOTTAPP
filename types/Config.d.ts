/**
 * Set config setup changes in both config.services.ts and config.d.ts
 * */

import { Shelf } from '#src/enum/PersonalShelf';

export type Config = {
  id?: string;
  siteName?: string;
  description: string;
  player?: string | null;
  analyticsToken?: string | null;
  adSchedule?: string | null;
  integrations: {
    cleeng?: Cleeng;
  };
  assets: { banner?: string };
  content: Content[];
  menu: Menu[];
  styling: Styling;
  features?: Features;
  custom?: Record<string, unknown>;
  contentSigningService?: ContentSigningConfig;
};

export type ContentSigningConfig = {
  host: string;
  drmPolicyId?: string;
};

export type Content = {
  contentId?: string;
  title?: string;
  type: Shelf;
  featured?: boolean;
  enableText?: boolean;
  backgroundColor?: string | null;
};

export type Menu = {
  label: string;
  contentId: string;
  type?: Shelf.Playlist;
  filterTags?: string;
};

export type Styling = {
  backgroundColor?: string | null;
  highlightColor?: string | null;
  headerBackground?: string | null;
  dynamicBlur?: boolean;
  posterFading?: boolean;
  shelfTitles?: boolean;
  footerText?: string | null;
};

export type Cleeng = {
  id?: string | null;
  monthlyOffer?: string | null;
  yearlyOffer?: string | null;
  useSandbox?: boolean;
};

export type Features = {
  enableCasting?: boolean;
  enableSharing?: boolean;
  recommendationsPlaylist?: string | null;
  searchPlaylist?: string | null;
  favoritesList?: string | null;
  continueWatchingList?: string | null;
};

/**
 * AVOD: Advert based
 * AUTHVOD: Authorisation based, needs registration
 * SVOD: Subscription based
 *
 * TVOD: Transactional based. This can only be set per item, so is not a valid accessModel value
 * */
export type AccessModel = 'AVOD' | 'AUTHVOD' | 'SVOD';

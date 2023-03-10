import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import TextField from './TextField';

describe('<TextField>', () => {
  test('renders and matches snapshot', () => {
    const { container } = render(<TextField label="Label" placeholder="Placeholder" name="name" value="" onChange={jest.fn()} />);

    expect(container).toMatchSnapshot();
  });

  test('renders and matches multiline snapshot', () => {
    const { container } = render(<TextField label="Label" placeholder="Placeholder" name="name" value="" onChange={jest.fn()} multiline />);

    expect(container).toMatchSnapshot();
  });

  test('triggers an onChange event when the input value changes', () => {
    const onChange = jest.fn();
    const { getByPlaceholderText } = render(<TextField value="" onChange={onChange} placeholder="Enter your name" />);

    fireEvent.change(getByPlaceholderText('Enter your name'), { target: { value: 'John Doe' } });

    expect(onChange).toBeCalled();
  });

  test('shows the helper text below the input', () => {
    const { queryByText } = render(<TextField value="" onChange={jest.fn()} helperText="Assertive text" />);

    expect(queryByText('Assertive text')).toBeDefined();
  });
});

import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Dropdown from '../Dropdown';
import { selectId, labelText, options } from './mockData';

const mockOnOptionChange = jest.fn();

const renderDropdown = () =>
  render(
    <Dropdown
      selectId={selectId}
      labelText={labelText}
      options={options}
      onOptionChange={mockOnOptionChange}
    />
  );

describe('<Dropdown />', () => {
  it('should match snapshot', () => {
    const { asFragment } = renderDropdown();

    expect(asFragment()).toMatchSnapshot();
  });

  it('should have correct select element id', () => {
    renderDropdown();

    expect(document.getElementById(selectId)).toBeInTheDocument();
  });

  it('should display correct label text', () => {
    const { getByTestId } = renderDropdown();

    expect(getByTestId('label').textContent).toBe(labelText);
  });

  it('should display correct selected option', () => {
    renderDropdown();
    const selectElement = document.getElementById(selectId);

    expect(selectElement.value).toBe(options[0].value);

    fireEvent.change(
      selectElement, 
      { target: { value: 'Option 3' } },
    );
    expect(selectElement.value).toBe(options[2].value);
  });

  it('should fire onChange when an option changes', () => {
    renderDropdown();
    const selectElement = document.getElementById(selectId);

    fireEvent.change(
      selectElement, 
      { target: { value: 'Option 3' } },
    );

    expect(mockOnOptionChange).toHaveBeenCalledTimes(1);
  });
});

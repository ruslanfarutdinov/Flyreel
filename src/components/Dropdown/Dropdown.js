import React from 'react';
import PropTypes from 'prop-types';

import './Dropdown.css';

function Dropdown({ 
  selectId,
  labelText,
  options,
  onChangeHandler,
 }) {
  return (
    <div className="Dropdown">
      <label htmlFor={selectId}>{labelText}</label>
      <select id={selectId} onChange={onChangeHandler}>
        <option value="">-Please choose an option-</option>
        {options.map(option => (
          <option key={option.id} value={option.value}>{option.value}</option>
        ))}
      </select>
    </div>
  );
}

Dropdown.propTypes = {
  selectId: PropTypes.string.isRequired,
  labelText: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      value: PropTypes.string,
    })).isRequired,
  onChangeHandler: PropTypes.func.isRequired,
};

export default Dropdown;
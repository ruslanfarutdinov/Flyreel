import React from 'react';
import PropTypes from 'prop-types';

import './Dropdown.css';

function Dropdown({ 
  selectId,
  labelText,
  options,
  onOptionChange,
 }) {
  return (
    <div className="Dropdown">
      <label htmlFor={selectId} className="Label">{labelText}</label>
      <select id={selectId} onChange={onOptionChange} className="Select">
        {options.map(option => (
          <option 
            key={option.id} 
            value={option.value}
          >
            {option.value}
          </option>
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
      id: PropTypes.number.isRequired,
      value: PropTypes.string.isRequired,
    })).isRequired,
  onOptionChange: PropTypes.func.isRequired,
};

export default Dropdown;
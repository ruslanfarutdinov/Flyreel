import React, { useState, useCallback } from 'react';

import PieChart from './components/PieChart/PieChart';
import BarChart from './components/BarChart/BarChart';
import Dropdown from './components/Dropdown/Dropdown';

import './App.css';
import { populationData } from './data';

function App() {
  const [dropdownOptions] = useState([
    { id: 1, value: 'Pie Chart' },
    { id: 2, value: 'Bar Chart' },
  ]);

  const onDropdownChangeHandler = e => {
    e.preventDefault();
    console.log(e.target.value);
  };

  return (
    <div className="App">
      <div className="Sidebar">
        <Dropdown 
          selectId="population"
          labelText="Choose Chart Type:"
          options={dropdownOptions}
          onChangeHandler={onDropdownChangeHandler}
        />
      </div>
      <div className="Chart">
        {/* <PieChart 
          pieData={populationData} 
          width={500} 
          height={500}
        /> */}
        <BarChart 
          barData={populationData} 
          width={700}
          height={500}
        />
      </div>
    </div>
  );
}

export default App;

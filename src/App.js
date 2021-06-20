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

  const onDropdownChangeHandler = useCallback(e => {
    e.preventDefault();
    console.log(e.target.value);
  });

  return (
    <div className="App">
      <PieChart 
        pieData={populationData} 
        width={500} 
        height={500}
      />
      {/* <BarChart 
        barData={populationData} 
        width={700}
        height={500}
      /> */}
      <Dropdown 
        selectId="population"
        labelText="Choose chart type:"
        options={dropdownOptions}
        onChangeHandler={onDropdownChangeHandler}
      />
    </div>
  );
}

export default App;

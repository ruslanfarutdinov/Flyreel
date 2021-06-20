import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

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
    <Router>
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
          <Switch>
            <Route path="/pie">
                <PieChart 
                  pieData={populationData} 
                  width={500} 
                  height={500}
                />
            </Route>
            <Route path="/bar">
              
                <BarChart 
                  barData={populationData} 
                  width={700}
                  height={500}
                />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;

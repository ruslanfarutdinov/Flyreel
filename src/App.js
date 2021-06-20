import React from 'react';
import { 
  Switch, 
  Route, 
  useHistory,
} from "react-router-dom";

import PieChart from './components/PieChart/PieChart';
import BarChart from './components/BarChart/BarChart';
import Dropdown from './components/Dropdown/Dropdown';

import './App.css';
import { populationData } from './data';

const dropdownOptions = [
  { id: 0, value: '--Please choose an option--' },
  { id: 1, value: 'Pie Chart' },
  { id: 2, value: 'Bar Chart' },
];

function App() {
  let history = useHistory();

  function onOptionChangeHandler(e) {
    e.preventDefault();

    if (e.target.value === 'Pie Chart') {
      history.push('/pie');
    } else if (e.target.value === 'Bar Chart') {
      history.push('/bar');
    }
  }

  return (
    <div className="App">
      <div className="Sidebar">
        <Dropdown 
          selectId="population"
          labelText="Choose Chart Type:"
          options={dropdownOptions}
          onOptionChange={onOptionChangeHandler}
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
  );
}

export default App;

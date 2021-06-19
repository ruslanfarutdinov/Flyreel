import React from 'react';

import PieChart from './components/PieChart/PieChart';
import BarChart from './components/BarChart/BarChart';

import './App.css';
import { populationData } from './data';

function App() {
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
    </div>
  );
}

export default App;

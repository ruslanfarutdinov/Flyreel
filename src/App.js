import React from 'react';
import './App.css';

import PieChart from './components/PieChart/PieChart';

import { data } from './data';

function App() {
  return (
    <div className="App">
      <PieChart 
        pieData={data} 
        width={500} 
        height={500} />
    </div>
  );
}

export default App;

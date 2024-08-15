import React, { useState } from 'react';
import logo from './logo.svg';
import { Counter } from './components/counter/Counter';
import { CounterSettings } from './components/counterSettings/CounterSettings';
import './App.css';


function App() {

  const [minMaxCounterV, setMinMaxCounterV] = useState<{min: number, max: number}>(
    {min: 0, max: 5}
  );

  return (
    <div className="App">
      <CounterSettings />
      <Counter />
    </div>
  );
}

export default App;

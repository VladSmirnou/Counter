import React, { useState } from 'react';
import logo from './logo.svg';
import { Counter } from './components/counter/Counter';
import { CounterSettings } from './components/counterSettings/CounterSettings';
import './App.css';


export type minMaxCounterVType = {
  minCounterValue: number
  maxCounterValue: number
}

const INITIAL_MIN_COUNTER_VALUE = 0;
const INITIAL_MAX_COUNTER_VALUE = 5;

function App() {

  const [minMaxCounterV, setMinMaxCounterV] = useState<minMaxCounterVType>(
    {
      minCounterValue: INITIAL_MIN_COUNTER_VALUE,
      maxCounterValue: INITIAL_MAX_COUNTER_VALUE
    }
  );

  const [counterValue, setCounterValue] = useState<number>(
    INITIAL_MIN_COUNTER_VALUE
  );
  const [settingsModeOn, setSettingsModeOn] = useState<boolean>(false);

  return (
    <div className="App">
      <CounterSettings minMaxCounterV={minMaxCounterV}
                       setMinMaxCounterV={setMinMaxCounterV}
                       setCounterValue={setCounterValue}
                       settingsModeOn={settingsModeOn}
                       setSettingsModeOn={setSettingsModeOn}
                       />
      <Counter minMaxCounterV={minMaxCounterV}
               counterValue={counterValue}
               setCounterValue={setCounterValue}
               settingsModeOn={settingsModeOn}
               />
    </div>
  );
}

export default App;

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
  const [error, setError] = useState<string|null>(null);
  return (
    <div className="App">
      <div className='counterBlock'>
        <CounterSettings minMaxCounterV={minMaxCounterV}
                        setMinMaxCounterV={setMinMaxCounterV}
                        setCounterValue={setCounterValue}
                        settingsModeOn={settingsModeOn}
                        setSettingsModeOn={setSettingsModeOn}
                        setError={setError}
                        error={error}
                        />
        <Counter minMaxCounterV={minMaxCounterV}
                counterValue={counterValue}
                setCounterValue={setCounterValue}
                settingsModeOn={settingsModeOn}
                error={error}
                />
      </div>
    </div>
  );
}

export default App;

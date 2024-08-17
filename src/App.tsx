import React, { useState } from 'react';
import { Counter } from './components/counter/Counter';
import { CounterSettings } from './components/counterSettings/CounterSettings';
import './App.css';
import {
  INITIAL_MAX_COUNTER_VALUE,
  INITIAL_MIN_COUNTER_VALUE
} from './constants';
import { MinMaxCounterVType } from './appTypes';

function App() {
  const [minMaxCounterV, setMinMaxCounterV] = useState<MinMaxCounterVType>(
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

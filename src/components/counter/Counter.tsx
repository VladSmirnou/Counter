import React, { useState } from 'react';
import { Button } from '../button/Button';
import { Scoreboard } from '../scoreboard/Scoreboard';
import s from './Counter.module.css';
import { CounterPropsType } from './counterTypes';


export const Counter: React.FC<CounterPropsType> = (
  {
    minMaxCounterV: {
      minCounterValue,
      maxCounterValue
    },
    settingsModeOn,
    error,
    getCSSClassNameBuilder
  }
) => {
  const [counterValue, setCounterValue] = useState<number>(minCounterValue);
  const [prevMinVal, setPrevMinVal] = useState<number>(minCounterValue);

  if (!Object.is(prevMinVal, minCounterValue)) {
    setPrevMinVal(minCounterValue);
    setCounterValue(minCounterValue);
    return null;
  }

  const incrementCounterValue = () => {
    if (counterV_lt_MaxV) setCounterValue(counterValue + 1);
  }
  const resetCounterValue = () => setCounterValue(minCounterValue);

  const counterV_lt_MaxV = counterValue < maxCounterValue;
  
  const predicate = settingsModeOn || !!error;

  const incButtonDisabled = !counterV_lt_MaxV || predicate;
  const resetButtonDisabled = counterValue === minCounterValue || predicate;

  return (
    <div className={s.counter}>
      <Scoreboard counterValue={counterValue}
                  counterV_lt_MaxV={counterV_lt_MaxV}
                  settingsModeOn={settingsModeOn}
                  error={error}
                  getCSSClassNameBuilder={getCSSClassNameBuilder}
                  />
      <div className={s.flexWrapper}>
        <Button disabled={incButtonDisabled}
                callBack={incrementCounterValue}
        >inc</Button>
        <Button disabled={resetButtonDisabled}
                callBack={resetCounterValue}
        >reset</Button>
      </div>
    </div>
  )
}

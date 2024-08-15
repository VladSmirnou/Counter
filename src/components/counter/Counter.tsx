import React, { useState } from 'react';
import { Button } from '../button/Button';
import { Scoreboard } from '../scoreboard/Scoreboard';
import { minMaxCounterVType } from '../../App';


type CounterPropsType = {
  minMaxCounterV: minMaxCounterVType
  counterValue: number
  setCounterValue: (v: number) => void
  settingsModeOn: boolean
}

export const Counter: React.FC<CounterPropsType> = (
  {
    minMaxCounterV: {
      minCounterValue,
      maxCounterValue
    },
    counterValue,
    setCounterValue,
    settingsModeOn
  }
) => {
  const counterV_lt_MaxV = counterValue < maxCounterValue;

  const incrementCounterValue = () => {
    if (counterV_lt_MaxV) setCounterValue(counterValue + 1);
  }
  const resetCounterValue = () => setCounterValue(minCounterValue);

  return (
    <div>
      <Scoreboard counterValue={counterValue}
                  counterV_lt_MaxV={counterV_lt_MaxV}
                  settingsModeOn={settingsModeOn}
                  />
      <Button disabled={!counterV_lt_MaxV || settingsModeOn}
              callBack={incrementCounterValue}
      >inc</Button>
      <Button disabled={counterValue === minCounterValue || settingsModeOn}
              callBack={resetCounterValue}
      >reset</Button>
    </div>
  )
}

import React, { useState } from 'react';
import { MIN_COUNTER_VALUE, MAX_COUNTER_VALUE } from './constants';
import { Button } from '../button/Button';
import { Scoreboard } from '../scoreboard/Scoreboard';


export const Counter = () => {
  const [counterValue, setCounterValue] = useState<number>(
    MIN_COUNTER_VALUE
  );

  const counterV_lt_MaxV = counterValue < MAX_COUNTER_VALUE;

  const incrementCounterValue = () => {
    if (counterV_lt_MaxV) setCounterValue(counterValue + 1);
  }
  const resetCounterValue = () => setCounterValue(MIN_COUNTER_VALUE);

  return (
    <div>
      <Scoreboard counterValue={counterValue} counterV_lt_MaxV={counterV_lt_MaxV} />
      <Button disabled={!counterV_lt_MaxV}
              callBack={incrementCounterValue}
      >inc</Button>
      <Button disabled={counterValue === MIN_COUNTER_VALUE}
              callBack={resetCounterValue}
      >reset</Button>
    </div>
  )
}

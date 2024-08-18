import React, { useState } from 'react';
import { Counter } from './components/counter/Counter';
import { CounterSettings } from './components/counterSettings/CounterSettings';
import './App.css';
import {
  INITIAL_MAX_COUNTER_VALUE,
  INITIAL_MIN_COUNTER_VALUE
} from './constants';
import { MinMaxCounterVType } from './appTypes';
import { OnChangeMin } from './components/counterSettings/onChangeHandlers/handlers/onChangeMinHandler';
import { OnChangeMax } from './components/counterSettings/onChangeHandlers/handlers/onChangeMaxHandler';
import { valueValidatorRunner } from './utils/validators/valueValidatorRunner';
import { IncorrectFieldName } from './components/counterSettings/counterSettingsTypes';
import { ValidateMin } from './utils/validators/valueValidators/validateMin';
import { ValidateMax } from './utils/validators/valueValidators/validateMax';
import { ValidateBoth } from './utils/validators/valueValidators/validateBoth';
import { MIN, MAX, BOTH } from './components/counterSettings/constants';
import { MIN_ALLOWED_VALUE } from './utils/validators/valueValidators/constants';

const validatorRunner = new valueValidatorRunner([
  new ValidateMin(MIN, MIN_ALLOWED_VALUE),
  new ValidateMax(MAX),
  new ValidateBoth(BOTH)
])

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

  const onChangeMaxHandlerWrapper = (
    minValueRef: React.RefObject<HTMLInputElement>,
    maxValueRef: React.RefObject<HTMLInputElement>,
    incorrectField: React.MutableRefObject<IncorrectFieldName | null>
  ) => {
    return new OnChangeMax(
      minValueRef,
      maxValueRef,
      incorrectField,
      validatorRunner,
      setSettingsModeOn,
      setError,
    )
  }

  const onChangeMinHandlerWrapper = (
    minValueRef: React.RefObject<HTMLInputElement>,
    maxValueRef: React.RefObject<HTMLInputElement>,
    incorrectField: React.MutableRefObject<IncorrectFieldName | null>
  ) => {
    return new OnChangeMin(
      minValueRef,
      maxValueRef,
      incorrectField,
      validatorRunner,
      setSettingsModeOn,
      setError,
    )
  }

  return (
    <div className="App">
      <div className='counterBlock'>
        <CounterSettings minMaxCounterV={minMaxCounterV}
                        setMinMaxCounterV={setMinMaxCounterV}
                        setCounterValue={setCounterValue}
                        settingsModeOn={settingsModeOn}
                        setSettingsModeOn={setSettingsModeOn}
                        error={error}
                        onChangeMaxHandlerWrapper={onChangeMaxHandlerWrapper}
                        onChangeMinHandlerWrapper={onChangeMinHandlerWrapper}
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

import { useEffect, useRef, useState } from 'react';
import { Counter } from './components/counter/Counter';
import { CounterSettings } from './components/counterSettings/CounterSettings';
import './App.css';
import {
  INITIAL_MAX_COUNTER_VALUE,
  INITIAL_MIN_COUNTER_VALUE
} from './constants';
import { MinMaxCounterVType } from './appTypes';
import { valueValidatorRunner } from './utils/validators/valueValidatorRunner';
import { IncorrectFieldName } from './components/counterSettings/counterSettingsTypes';
import { ValidateMin } from './utils/validators/valueValidators/validateMin';
import { ValidateMax } from './utils/validators/valueValidators/validateMax';
import { ValidateBoth } from './utils/validators/valueValidators/validateBoth';
import { MIN, MAX, BOTH, STORED_VALUES } from './components/counterSettings/constants';
import { MIN_ALLOWED_VALUE } from './utils/validators/valueValidators/constants';
import { LocalStorageRepo } from './repo/localStorageRepo';

const validatorRunner = new valueValidatorRunner([
  new ValidateMin(MIN, MIN_ALLOWED_VALUE),
  new ValidateMax(MAX),
  new ValidateBoth(BOTH)
])

const repoObj = new LocalStorageRepo;

export type ErrorType = {
  error: string
  incorrectFieldName: IncorrectFieldName
}

function App() {
  useEffect(() => {
    const storedValues = repoObj.getItem(STORED_VALUES);
    if (storedValues) {
      const {minCounterValue, maxCounterValue} = JSON.parse(storedValues);
      // should check if parsed values are numbers or not,
      // and throw here.
      setMinMaxCounterV({minCounterValue, maxCounterValue});
    }
  }, []);

  const [minMaxCounterV, setMinMaxCounterV] = useState<MinMaxCounterVType>(
    {
      minCounterValue: INITIAL_MIN_COUNTER_VALUE,
      maxCounterValue: INITIAL_MAX_COUNTER_VALUE
    }
  );

  const [settingsModeOn, setSettingsModeOn] = useState<boolean>(false);
  const [errorData, setErrorData] = useState<ErrorType|null>(null);

  return (
    <div className="App">
      <div className='counterBlock'>
        <CounterSettings minMaxCounterV={minMaxCounterV}
                        setMinMaxCounterV={setMinMaxCounterV}
                        settingsModeOn={settingsModeOn}
                        setSettingsModeOn={setSettingsModeOn}
                        repo={repoObj}
                        incorrectFieldName={errorData?.incorrectFieldName}
                        setErrorData={setErrorData}
                        validatorRunner={validatorRunner}
                        />
        <Counter minMaxCounterV={minMaxCounterV}
                settingsModeOn={settingsModeOn}
                error={errorData?.error}
                />
      </div>
    </div>
  );
}

export default App;

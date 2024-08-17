import React, { ChangeEvent, useRef } from 'react';
import s from './counterSettings.module.css';
import { Button } from '../button/Button';
import { minMaxCounterVType } from '../../App';


const INCORRECT_VALUE_ERROR_TEXT = 'Incorrect value!';

type CounterSettingsPropsType = {
  minMaxCounterV: minMaxCounterVType
  setMinMaxCounterV: (data: minMaxCounterVType) => void
  setCounterValue: (v: number) => void
  settingsModeOn: boolean
  setSettingsModeOn: (v: boolean) => void
  setError: (err: string|null) => void
  error: string | null
}

type IncorrectFieldName = 'min' | 'max' | 'both';

interface Validator {
  validateValues(minValue: number, maxValue: number): boolean;
  getIncorrectFieldName(): IncorrectFieldName;
}

class RunValueValidators {
  validators: Array<Validator>;

  constructor(classes: Array<Validator>) {
    this.validators = classes;
  }

  validate(
    validator: Validator,
    minValue: number,
    maxValue: number
  ): IncorrectFieldName | undefined {
    const valuesAreValid = validator.validateValues(minValue, maxValue);
    if(!valuesAreValid) return validator.getIncorrectFieldName();
    return;
  }
}

class ValidateMin implements Validator {
  incorrectFieldName: IncorrectFieldName = 'min';

  validateValues(minValue: number, maxValue: number): boolean {
    if (minValue < 0) return false
    return true
  }

  getIncorrectFieldName() {
    return this.incorrectFieldName;
  }
}

class ValidateMax implements Validator {
  incorrectFieldName: IncorrectFieldName = 'max';

  validateValues(minValue: number, maxValue: number): boolean {
    if (minValue > maxValue) return false
    return true
  }

  getIncorrectFieldName() {
    return this.incorrectFieldName;
  }
}

class ValidateBoth implements Validator {
  incorrectFieldName: IncorrectFieldName = 'both';

  validateValues(minValue: number, maxValue: number): boolean {
    if (minValue === maxValue) return false
    return true
  }

  getIncorrectFieldName() {
    return this.incorrectFieldName;
  }
}

const validateMinObj: Validator = new ValidateMin;
const validateMaxObj: Validator = new ValidateMax;
const validateBothObj: Validator = new ValidateBoth;
const validationRunner = new RunValueValidators(
  [
    validateMinObj,
    validateMaxObj,
    validateBothObj
  ]
);

abstract class OnSet {
  minValueRef: React.RefObject<HTMLInputElement>;
  maxValueRef: React.RefObject<HTMLInputElement>;
  incorrectField: React.MutableRefObject<IncorrectFieldName | null>;
  setSettingsModeOn: (v: boolean) => void;
  setError: (err: string|null) => void;

  constructor(
    min: React.RefObject<HTMLInputElement>,
    max: React.RefObject<HTMLInputElement>,
    setSettingsModeOn: (v: boolean) => void,
    setError: (err: string|null) => void,
    incorrectField: React.RefObject<IncorrectFieldName | null>
  ) {
    this.minValueRef = min;
    this.maxValueRef = max;
    this.setSettingsModeOn = setSettingsModeOn;
    this.setError = setError
    this.incorrectField = incorrectField
  }

  updateCurrentRefValue(value: string) {
    if (this.minValueRef.current && this.maxValueRef.current) {  
      const min = +this.minValueRef.current.value;
      const max = +this.maxValueRef.current.value;
      if (this.valuesAreValid(min, max)) {
        this.updateRefValue(value);
        this.setSettingsModeOn(true);
        this.incorrectField.current = null; 
        this.setError(null);
      } else {
        this.setError(INCORRECT_VALUE_ERROR_TEXT);
      }
    }
  }

  check(predicate: any, incorrectFieldName: string) {
    if (predicate()) return incorrectFieldName;
  }

  valuesAreValid(minValue: number, maxValue: number): boolean {
    for (const validator of validationRunner.validators) {
      const invalidField = validationRunner.validate(
        validator,
        minValue,
        maxValue
      );
      if (invalidField) {
        this.incorrectField.current = invalidField;
        return false
      }
    }
    return true
  }

  abstract updateRefValue(value: string): void;
}

class OnSetMin extends OnSet {
  updateRefValue(value: string) {
    if (this.minValueRef.current) {
      this.minValueRef.current.value = value;
    }
  }
}

class OnSetMax extends OnSet {
  updateRefValue(value: string) {
    if (this.maxValueRef.current) {
      this.maxValueRef.current.value = value;
    }
  }
}

export const CounterSettings: React.FC<CounterSettingsPropsType> = (
  {
    minMaxCounterV: {
      minCounterValue,
      maxCounterValue
    },
    setMinMaxCounterV,
    setCounterValue,
    settingsModeOn,
    setSettingsModeOn,
    setError,
    error
  }
) => {

  const minValueRef = useRef<HTMLInputElement>(null);
  const maxValueRef = useRef<HTMLInputElement>(null);
  const incorrectField = useRef<IncorrectFieldName | null>(null);

  const OnSetMaxValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const maxVal = new OnSetMax(
      minValueRef,
      maxValueRef,
      setSettingsModeOn,
      setError,
      incorrectField
    )
    maxVal.updateCurrentRefValue(e.currentTarget.value);
  }

  const onSetMinValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const minVal = new OnSetMin(
      minValueRef,
      maxValueRef,
      setSettingsModeOn,
      setError,
      incorrectField
    )
    minVal.updateCurrentRefValue(e.currentTarget.value);
  }

  const onSetMinMaxCounterHandler = () => {
    if (minValueRef.current && maxValueRef.current) {
      setCounterValue(+minValueRef.current.value);
      setMinMaxCounterV({
        minCounterValue: +minValueRef.current.value,
        maxCounterValue: +maxValueRef.current.value
      });
      setSettingsModeOn(false);
    }
  }
  const setButtonDisabled = !settingsModeOn || !!error;
  const incorrectFieldName = incorrectField.current;
  
  return (
    <div className={s.counterSettingsBlock}>
      <div className={s.flexWrapper}>
        <div className={s.inputAndLabel}>
          <span className={s.inputLabel}>max value: </span><input type={'number'}
                            ref={maxValueRef}
                            onChange={OnSetMaxValueHandler}
                            defaultValue={maxCounterValue}
                            className={incorrectFieldName === 'max' || incorrectFieldName === 'both' ? s.incorrect : ''}
                            />
        </div>
        <div className={s.inputAndLabel}>
          <span className={s.inputLabel}>start value: </span><input type={'number'}
                              ref={minValueRef}
                              onChange={onSetMinValueHandler}
                              defaultValue={minCounterValue}
                              className={incorrectFieldName === 'min' || incorrectFieldName === 'both' ? s.incorrect : ''}
                              />
        </div>
      </div>
      <div className={s.buttonWrapper}>
        <Button disabled={setButtonDisabled} callBack={onSetMinMaxCounterHandler}>set</Button>
      </div>
    </div>
  )
}

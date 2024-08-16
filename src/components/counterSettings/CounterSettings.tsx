import React, { ChangeEvent, useRef, useState } from 'react';
import { Button } from '../button/Button';
import { minMaxCounterVType } from '../../App';


type CounterSettingsPropsType = {
  minMaxCounterV: minMaxCounterVType
  setMinMaxCounterV: (data: minMaxCounterVType) => void
  setCounterValue: (v: number) => void
  settingsModeOn: boolean
  setSettingsModeOn: (v: boolean) => void
  setError: (err: string|null) => void
  error: string | null
}

abstract class OnSet {
  minValueRef: React.RefObject<HTMLInputElement>;
  maxValueRef: React.RefObject<HTMLInputElement>;
  setSettingsModeOn: (v: boolean) => void;
  setError: (err: string|null) => void;

  constructor(
    min: React.RefObject<HTMLInputElement>,
    max: React.RefObject<HTMLInputElement>,
    setSettingsModeOn: (v: boolean) => void,
    setError: (err: string|null) => void
  ) {
    this.minValueRef = min;
    this.maxValueRef = max;
    this.setSettingsModeOn = setSettingsModeOn;
    this.setError = setError
  }

  updateCurrentRefValue(
    value: string
  ) {
    if (this.minValueRef.current && this.maxValueRef.current) {  
      const min = +this.minValueRef.current.value;
      const max = +this.maxValueRef.current.value;
      if (this.valuesAreValid(min, max)) {
        this.updateRefValue(value);
        this.setSettingsModeOn(true);
      }
    }
  }

  valuesAreValid(minValue: number, maxValue: number): boolean {
    if (minValue < 0 || minValue > maxValue || minValue === maxValue) {
      this.setError('Incorrect value!');
      return false;
    } 
    this.setError(null);
    return true;
  }

  abstract updateRefValue(value: string): void;
}

class OnSetMin extends OnSet {
  constructor(
    min: React.RefObject<HTMLInputElement>,
    max: React.RefObject<HTMLInputElement>,
    setSettingsModeOn: (v: boolean) => void,
    setError: (err: string|null) => void
  ) {
    super(min, max, setSettingsModeOn, setError);
  }

  updateRefValue(value: string) {
    if(this.minValueRef.current) {
      this.minValueRef.current.value = value;
    }
  }
}

class OnSetMax extends OnSet {
  constructor(
    min: React.RefObject<HTMLInputElement>,
    max: React.RefObject<HTMLInputElement>,
    setSettingsModeOn: (v: boolean) => void,
    setError: (err: string|null) => void
  ) {
    super(min, max, setSettingsModeOn, setError);
  }

  updateRefValue(value: string) {
    if(this.maxValueRef.current) {
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

  const OnSetMaxValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const maxVal = new OnSetMax(
      minValueRef, maxValueRef, setSettingsModeOn, setError
    )
    maxVal.updateCurrentRefValue(e.currentTarget.value);
  }

  const onSetMinValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const minVal = new OnSetMin(
      minValueRef, maxValueRef, setSettingsModeOn, setError
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

  return (
    <div>
      <div>
        max value: <input type={'number'}
                          ref={maxValueRef}
                          onChange={OnSetMaxValueHandler}
                          defaultValue={maxCounterValue}
                          />
      </div>
      <div>
        start value: <input type={'number'}
                            ref={minValueRef}
                            onChange={onSetMinValueHandler}
                            defaultValue={minCounterValue}
                            />
      </div>
      <Button disabled={!settingsModeOn || !!error} callBack={onSetMinMaxCounterHandler}>set</Button>
    </div>
  )
}

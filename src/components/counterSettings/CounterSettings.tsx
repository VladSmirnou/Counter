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
 // min: 0 max: 10 - valid
 // min: -1 - invalid
 // min: 3 max: 2 - invalid
 // min: 3 max: 3 - invalid, because it is a no op

  // const currentRefExists = (): boolean => {
  //   return !!(minValueRef.current && maxValueRef.current);
  // }

  const valuesAreValid = (
    minValue: number, maxValue: number
  ): boolean => {
    if (minValue < 0) {
      setError('Incorrect value!');
      return false;
    } // set error
    if (minValue > maxValue) {
      setError('Incorrect value!');
      return false; // set error
    }
    if (minValue === maxValue) {
      setError('Incorrect value!');
      return false; // set error
    }
    setError(null);
    return true;
  }

  const OnSetMaxValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (minValueRef.current && maxValueRef.current) {  
      const min = +minValueRef.current.value;
      const max = +maxValueRef.current.value;
      if (valuesAreValid(min, max)) {
        maxValueRef.current.value = e.currentTarget.value;
        setSettingsModeOn(true);
      }
    }
  }

  const onSetMinValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (minValueRef.current && maxValueRef.current) {
      const min = +minValueRef.current.value;
      const max = +maxValueRef.current.value;
      if (valuesAreValid(min, max)) {
        minValueRef.current.value = e.currentTarget.value;
        setSettingsModeOn(true);
      }
    }
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

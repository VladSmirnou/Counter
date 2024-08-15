import React, { ChangeEvent, useRef, useState } from 'react';
import { Button } from '../button/Button';
import { minMaxCounterVType } from '../../App';


type CounterSettingsPropsType = {
  minMaxCounterV: minMaxCounterVType
  setMinMaxCounterV: (data: minMaxCounterVType) => void
  setCounterValue: (v: number) => void
  settingsModeOn: boolean
  setSettingsModeOn: (v: boolean) => void
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
    setSettingsModeOn
  }
) => {
  const minValueRef = useRef<HTMLInputElement>(null);
  const maxValueRef = useRef<HTMLInputElement>(null);

  const OnSetMaxValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (maxValueRef.current)
      maxValueRef.current.value = e.currentTarget.value;
      setSettingsModeOn(true);
  }

  const onSetMinValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (minValueRef.current)
      minValueRef.current.value = e.currentTarget.value;
      setSettingsModeOn(true);
  }

  const onSetMinMaxCounterHandler = () => {
    if (minValueRef.current && maxValueRef.current) {
      setMinMaxCounterV({
        minCounterValue: +minValueRef.current.value,
        maxCounterValue: +maxValueRef.current.value
      })
      setCounterValue(+minValueRef.current.value);
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
      <Button disabled={!settingsModeOn} callBack={onSetMinMaxCounterHandler}>set</Button>
    </div>
  )
}

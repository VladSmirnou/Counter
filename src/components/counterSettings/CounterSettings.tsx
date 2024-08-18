import React, { ChangeEvent, useRef } from 'react';
import s from './counterSettings.module.css';
import { Button } from '../button/Button';
import { MIN, MAX, BOTH, STORED_VALUES } from './constants';
import {
  IncorrectFieldName,
  CounterSettingsPropsType
} from './counterSettingsTypes';

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
    error,
    onChangeMinHandlerWrapper,
    onChangeMaxHandlerWrapper,
    repo,
    minValueRef,
    maxValueRef
  }
) => {
  const incorrectField = useRef<IncorrectFieldName | null>(null);

  const onChangeMaxValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const handler = onChangeMaxHandlerWrapper(
      minValueRef,
      maxValueRef,
      incorrectField
    )
    handler.updateCurrentRefValue(e.currentTarget.value);
  }

  const onChangeMinValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const handler = onChangeMinHandlerWrapper(
      minValueRef,
      maxValueRef,
      incorrectField
    )
    handler.updateCurrentRefValue(e.currentTarget.value);
  }

  const onSetMinMaxCounterHandler = () => {
    if (minValueRef.current && maxValueRef.current) {
      setCounterValue(+minValueRef.current.value);
      const minMaxValues = {
        minCounterValue: +minValueRef.current.value,
        maxCounterValue: +maxValueRef.current.value
      }
      setMinMaxCounterV(minMaxValues);
      setSettingsModeOn(false);
      repo.setItem(STORED_VALUES, minMaxValues)
    }
  }
  const setButtonDisabled = !settingsModeOn || !!error;

  // TODO: refactor later
  const incorrectFieldName = incorrectField.current;
  let maxInputClass: string = '';
  let minInputClass: string = '';
  if (incorrectFieldName === BOTH) {
    maxInputClass = s.incorrect;
    minInputClass = s.incorrect;
  } else if (incorrectFieldName === MAX) {
    maxInputClass = s.incorrect;
  } else if (incorrectFieldName === MIN) {
    minInputClass = s.incorrect;
  }

  return (
    <div className={s.counterSettingsBlock}>
      <div className={s.flexWrapper}>
        <div className={s.inputAndLabel}>
          <span className={s.inputLabel}>max value: </span><input type={'number'}
                            ref={maxValueRef}
                            onChange={onChangeMaxValueHandler}
                            defaultValue={maxCounterValue}
                            className={maxInputClass}
                            />
        </div>
        <div className={s.inputAndLabel}>
          <span className={s.inputLabel}>start value: </span><input type={'number'}
                              ref={minValueRef}
                              onChange={onChangeMinValueHandler}
                              defaultValue={minCounterValue}
                              className={minInputClass}
                              />
        </div>
      </div>
      <div className={s.buttonWrapper}>
        <Button disabled={setButtonDisabled} callBack={onSetMinMaxCounterHandler}>set</Button>
      </div>
    </div>
  )
}

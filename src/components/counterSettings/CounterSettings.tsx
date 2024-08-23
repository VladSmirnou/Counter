import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import s from './counterSettings.module.css';
import { Button } from '../button/Button';
import { MIN, MAX, BOTH, STORED_VALUES } from './constants';
import { CounterSettingsPropsType } from './counterSettingsTypes';
import { MinMaxCounterVType } from '../../appTypes';

export const CounterSettings: React.FC<CounterSettingsPropsType> = (
  {
    minMaxCounterV,
    setMinMaxCounterV,
    settingsModeOn,
    setSettingsModeOn,
    repo,
    incorrectFieldName,
    setErrorData,
    validatorRunner,
    getCSSClassNameBuilder
  }
) => {
  const [minMaxValues, setMinMaxValues] = useState<MinMaxCounterVType>(
    minMaxCounterV
  );
  // I want to allow one re-render after a user typed incorrect values, so
  // that it can see those values.
  const reRenderedOnce = useRef<boolean>(false);

  useEffect(() => {
    setMinMaxValues(minMaxCounterV);
  }, [minMaxCounterV]);

  const onChangeMinMaxValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const nextMinMaxValues = {
      ...minMaxValues,
      [e.currentTarget.name === MIN ? 'minCounterValue'
        : 'maxCounterValue']: +e.currentTarget.value
    }

    const incorrectFieldData = validatorRunner.validate(
      nextMinMaxValues.minCounterValue, nextMinMaxValues.maxCounterValue
    )

    if (incorrectFieldData && reRenderedOnce.current) {
      return;
    }
    else if (incorrectFieldData && !reRenderedOnce.current) {
      const [incorrectFieldName, errorText] = incorrectFieldData;

      setErrorData({
        error: errorText,
        incorrectFieldName: incorrectFieldName
      })
      setMinMaxValues(nextMinMaxValues);
      reRenderedOnce.current = true;
    } else {
      setErrorData(null);
      setSettingsModeOn(true);
      setMinMaxValues(nextMinMaxValues);
      reRenderedOnce.current = false;
    }
  }

  const onSetMinMaxCounterHandler = () => {
      setMinMaxCounterV(minMaxValues);
      setSettingsModeOn(false);
      repo.setItem(STORED_VALUES, minMaxValues);
  }

  const setButtonDisabled = !settingsModeOn || !!incorrectFieldName;

  const maxInputClassBuilder = getCSSClassNameBuilder(s.defaultInputClass);
  const minInputClassBuilder = getCSSClassNameBuilder(s.defaultInputClass);

  // TODO: this is still not good enough, refactor later
  if (incorrectFieldName === BOTH) {
    maxInputClassBuilder.addClass(s.incorrect);
    minInputClassBuilder.addClass(s.incorrect);
  } else if (incorrectFieldName === MAX) {
    maxInputClassBuilder.addClass(s.incorrect);
  } else if (incorrectFieldName === MIN) {
    minInputClassBuilder.addClass(s.incorrect);
  }
  const maxInputClass = maxInputClassBuilder.build();
  const minInputClass = minInputClassBuilder.build();

  return (
    <div className={s.counterSettingsBlock}>
      <div className={s.flexWrapper}>
        <div className={s.inputAndLabel}>
          <span className={s.inputLabel}>max value: </span><input type={'number'}
                            value={minMaxValues.maxCounterValue}
                            onChange={onChangeMinMaxValueHandler}
                            className={maxInputClass}
                            name='max'
                            />
        </div>
        <div className={s.inputAndLabel}>
          <span className={s.inputLabel}>start value: </span><input type={'number'}
                              value={minMaxValues.minCounterValue}
                              onChange={onChangeMinMaxValueHandler}
                              className={minInputClass}
                              name='min'
                              />
        </div>
      </div>
      <div className={s.buttonWrapper}>
        <Button disabled={setButtonDisabled} callBack={onSetMinMaxCounterHandler}>set</Button>
      </div>
    </div>
  )
}

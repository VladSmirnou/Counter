import { MutableRefObject, RefObject } from 'react';
import { MinMaxCounterVType } from '../../appTypes';
import { MIN, MAX, BOTH } from './constants';
import { OnChange } from './onChangeHandlers/onChangeABC';
import { Repo } from './repoInterface';

export type CounterSettingsPropsType = {
    minMaxCounterV: MinMaxCounterVType
    setMinMaxCounterV: (data: MinMaxCounterVType) => void
    setCounterValue: (v: number) => void
    settingsModeOn: boolean
    setSettingsModeOn: (v: boolean) => void
    error: string | null
    onChangeMaxHandlerWrapper: () => OnChange
    onChangeMinHandlerWrapper: () => OnChange
    repo: Repo
    minValueRef: RefObject<HTMLInputElement>
    maxValueRef: RefObject<HTMLInputElement>
    incorrectField: MutableRefObject<IncorrectFieldName | null>
}

export type IncorrectFieldName = (
    typeof MIN |
    typeof MAX |
    typeof BOTH
);

import { MinMaxCounterVType } from '../../appTypes';
import { MIN, MAX, BOTH } from './constants';
import { OnChange } from './onChangeHandlers/onChangeABC';

export type CounterSettingsPropsType = {
    minMaxCounterV: MinMaxCounterVType
    setMinMaxCounterV: (data: MinMaxCounterVType) => void
    setCounterValue: (v: number) => void
    settingsModeOn: boolean
    setSettingsModeOn: (v: boolean) => void
    error: string | null
    onChangeMaxHandlerWrapper: (
        minValueRef: React.RefObject<HTMLInputElement>,
        maxValueRef: React.RefObject<HTMLInputElement>,
        incorrectField: React.MutableRefObject<IncorrectFieldName | null>
    ) => OnChange
    onChangeMinHandlerWrapper: (
        minValueRef: React.RefObject<HTMLInputElement>,
        maxValueRef: React.RefObject<HTMLInputElement>,
        incorrectField: React.MutableRefObject<IncorrectFieldName | null>
    ) => OnChange
}
  
export type IncorrectFieldName = (
    typeof MIN |
    typeof MAX |
    typeof BOTH
);

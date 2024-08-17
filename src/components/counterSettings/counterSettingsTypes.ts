import { MinMaxCounterVType } from '../../appTypes';
import { MIN, MAX, BOTH } from './constants';

export type CounterSettingsPropsType = {
    minMaxCounterV: MinMaxCounterVType
    setMinMaxCounterV: (data: MinMaxCounterVType) => void
    setCounterValue: (v: number) => void
    settingsModeOn: boolean
    setSettingsModeOn: (v: boolean) => void
    setError: (err: string|null) => void
    error: string | null
}
  
export type IncorrectFieldName = (
    typeof MIN |
    typeof MAX |
    typeof BOTH
);

  
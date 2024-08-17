import { MinMaxCounterVType } from '../../appTypes';

export type CounterPropsType = {
    minMaxCounterV: MinMaxCounterVType
    counterValue: number
    setCounterValue: (v: number) => void
    settingsModeOn: boolean
    error: string | null
}
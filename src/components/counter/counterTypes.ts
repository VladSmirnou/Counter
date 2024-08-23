import { MinMaxCounterVType } from '../../appTypes';
import { CssClassNameBuilder } from '../../utils/classNameBulder';

export type CounterPropsType = {
    minMaxCounterV: MinMaxCounterVType
    settingsModeOn: boolean
    error: string | undefined
    getCSSClassNameBuilder: (baseClass: string) => CssClassNameBuilder
}
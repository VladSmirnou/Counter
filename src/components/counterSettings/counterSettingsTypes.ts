import { MinMaxCounterVType } from '../../appTypes';
import { MIN, MAX, BOTH } from './constants';
import { Repo } from './repoInterface';
import { ErrorType } from '../../App';
import { ValidatorRunner } from './validatorRunnerInt';
import { CssClassNameBuilder } from '../../utils/classNameBulder';

export type IncorrectFieldName = (
    typeof MIN |
    typeof MAX |
    typeof BOTH
);

export type CounterSettingsPropsType = {
    minMaxCounterV: MinMaxCounterVType
    setMinMaxCounterV: (data: MinMaxCounterVType) => void
    settingsModeOn: boolean
    setSettingsModeOn: (v: boolean) => void
    repo: Repo
    incorrectFieldName: IncorrectFieldName | undefined
    setErrorData: (d: ErrorType|null) => void
    validatorRunner: ValidatorRunner
    getCSSClassNameBuilder: (baseClass: string) => CssClassNameBuilder
    error: boolean
}

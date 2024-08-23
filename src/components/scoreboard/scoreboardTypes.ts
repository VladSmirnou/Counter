import { CssClassNameBuilder } from "../../utils/classNameBulder"

export type ScoreboardPropsType = {
    counterValue: number
    counterV_lt_MaxV: boolean
    settingsModeOn: boolean
    error: string | undefined
    getCSSClassNameBuilder: (baseClass: string) => CssClassNameBuilder
}
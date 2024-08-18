import { IncorrectFieldName } from "../counterSettingsTypes"

export interface ValidatorRunner {
    validate(
        minValue: number,
        maxValue: number
    ): IncorrectFieldName | undefined
}

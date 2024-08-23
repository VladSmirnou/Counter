import { IncorrectFieldName } from "../../components/counterSettings/counterSettingsTypes";

export interface Validator {
    validateValues(minValue: number, maxValue: number): boolean;
    getIncorrectFieldNameAndErrorText(): [IncorrectFieldName, string];
}

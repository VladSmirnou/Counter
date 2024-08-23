import { Validator } from "../valueValidatorInterface";
import { IncorrectFieldName } from "../../../components/counterSettings/counterSettingsTypes";

export class ValidateMax implements Validator {
    incorrectFieldName: IncorrectFieldName;
    errorText: string;

    constructor(incFieldName: IncorrectFieldName, errorText: string) {
        this.incorrectFieldName = incFieldName;
        this.errorText = errorText
    }

    validateValues(minValue: number, maxValue: number): boolean {
      return minValue > maxValue;
    }
  
    getIncorrectFieldNameAndErrorText(): [IncorrectFieldName, string] {
      return [this.incorrectFieldName, this.errorText];
    }
}

import { Validator } from "../valueValidatorInterface";
import { IncorrectFieldName } from "../../../components/counterSettings/counterSettingsTypes";

export class ValidateMin implements Validator {
    incorrectFieldName: IncorrectFieldName;
    lowestAllowedValue: number;
    errorText: string;

    constructor(
      incFieldName: IncorrectFieldName,
      lowestAllVal: number,
      errorText: string
    ) {
        this.incorrectFieldName = incFieldName;
        this.lowestAllowedValue = lowestAllVal;
        this.errorText = errorText;
    }
    // Don't wanna separate this check from the others
    // now, even tho it is slightly different,
    // and 'maxValue' is unused.
    validateValues(minValue: number, maxValue: number): boolean {
      return minValue < this.lowestAllowedValue;
    }
  
    getIncorrectFieldNameAndErrorText(): [IncorrectFieldName, string] {
      return [this.incorrectFieldName, this.errorText];
    }
}

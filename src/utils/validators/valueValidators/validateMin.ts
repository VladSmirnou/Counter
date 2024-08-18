import { Validator } from "../valueValidatorInterface";
import { IncorrectFieldName } from "../../../components/counterSettings/counterSettingsTypes";

export class ValidateMin implements Validator {
    incorrectFieldName: IncorrectFieldName;
    lowestAllowedValue: number;
    constructor(incFieldName: IncorrectFieldName, lowestAllVal: number) {
        this.incorrectFieldName = incFieldName;
        this.lowestAllowedValue = lowestAllVal;
    }
    // Don't wanna separate this check from the others
    // now, even tho it is slightly different,
    // and 'maxValue' is unused.
    validateValues(minValue: number, maxValue: number): boolean {
      return minValue < this.lowestAllowedValue;
    }
  
    getIncorrectFieldName() {
      return this.incorrectFieldName;
    }
}

import { Validator } from "../valueValidatorInterface";
import { IncorrectFieldName } from "../../../components/counterSettings/counterSettingsTypes";

export class ValidateBoth implements Validator {
    incorrectFieldName: IncorrectFieldName;
  
    constructor(incFieldName: IncorrectFieldName) {
        this.incorrectFieldName = incFieldName;
    }

    validateValues(minValue: number, maxValue: number): boolean {
      return minValue === maxValue;
    }
  
    getIncorrectFieldName() {
      return this.incorrectFieldName;
    }
}
  
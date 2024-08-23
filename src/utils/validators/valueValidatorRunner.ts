import { Validator } from "./valueValidatorInterface";
import { IncorrectFieldName } from "../../components/counterSettings/counterSettingsTypes";
import { ValidatorRunner } from "../../components/counterSettings/validatorRunnerInt";

export class valueValidatorRunner implements ValidatorRunner {
    validators: Array<Validator>;
  
    constructor(classes: Array<Validator>) {
      this.validators = classes;
    }
  
    validate(
        minValue: number,
        maxValue: number
    ): [IncorrectFieldName, string] | undefined {
      for (const validator of this.validators) {
          const valuesAreInvalid = validator.validateValues(minValue, maxValue);
          if (valuesAreInvalid) return validator.getIncorrectFieldNameAndErrorText();
      }
      return;
    }
}

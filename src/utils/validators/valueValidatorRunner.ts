import { Validator } from "./valueValidatorInterface";
import { IncorrectFieldName } from "../../components/counterSettings/counterSettingsTypes";
import { ValidatorRunner } from "../../components/counterSettings/onChangeHandlers/validatorRunnerInt";

export class valueValidatorRunner implements ValidatorRunner {
    validators: Array<Validator>;
  
    constructor(classes: Array<Validator>) {
      this.validators = classes;
    }
  
    validate(
        minValue: number,
        maxValue: number
    ): IncorrectFieldName | undefined {
      for (const validator of this.validators) {
          const valuesAreValid = validator.validateValues(minValue, maxValue);
          if(!valuesAreValid) return validator.getIncorrectFieldName();
      }
      return;
    }
}

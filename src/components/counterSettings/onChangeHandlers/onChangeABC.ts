import { ValidatorRunner } from "./validatorRunnerInt";
import { IncorrectFieldName } from "../counterSettingsTypes";
import { INCORRECT_VALUE_ERROR_TEXT } from "../constants";

export abstract class OnChange {
    minValueRef: React.RefObject<HTMLInputElement>;
    maxValueRef: React.RefObject<HTMLInputElement>;
    incorrectField: React.MutableRefObject<IncorrectFieldName | null>;
    validatorRunner: ValidatorRunner;
    setSettingsModeOn: (v: boolean) => void;
    setError: (err: string|null) => void;
  
    constructor(
      min: React.RefObject<HTMLInputElement>,
      max: React.RefObject<HTMLInputElement>,
      incorrectField: React.RefObject<IncorrectFieldName | null>,
      validatorRunner: ValidatorRunner,
      setSettingsModeOn: (v: boolean) => void,
      setError: (err: string|null) => void,
    ) {
      this.minValueRef = min;
      this.maxValueRef = max;
      this.setSettingsModeOn = setSettingsModeOn;
      this.setError = setError;
      this.incorrectField = incorrectField;
      this.validatorRunner = validatorRunner;
    }
  
    updateCurrentRefValue(value: string) {
      if (this.minValueRef.current && this.maxValueRef.current) {  
        const min = +this.minValueRef.current.value;
        const max = +this.maxValueRef.current.value;
        if (this.valuesAreValid(min, max)) {
          this.updateRefValue(value);
          this.setSettingsModeOn(true);
          this.incorrectField.current = null; 
          this.setError(null);
        } else {
          this.setError(INCORRECT_VALUE_ERROR_TEXT);
        }
      }
    }

    valuesAreValid(minValue: number, maxValue: number): boolean {
      const invalidField = this.validatorRunner.validate(minValue, maxValue);
      if (invalidField) {
        this.incorrectField.current = invalidField;
        return false;
      }
      return true;
    }
  
    abstract updateRefValue(value: string): void;
}

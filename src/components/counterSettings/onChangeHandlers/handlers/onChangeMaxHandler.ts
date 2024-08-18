import { OnChange } from "../onChangeABC";

export class OnChangeMax extends OnChange {
    updateRefValue(value: string) {
        if (this.maxValueRef.current) {
            this.maxValueRef.current.value = value;
        }
    }
}
  
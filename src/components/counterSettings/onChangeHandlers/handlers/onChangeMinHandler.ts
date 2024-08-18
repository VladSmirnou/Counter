import { OnChange } from "../onChangeABC";

export class OnChangeMin extends OnChange {
    updateRefValue(value: string) {
        if (this.minValueRef.current) {
            this.minValueRef.current.value = value;
        }
    }
}
  
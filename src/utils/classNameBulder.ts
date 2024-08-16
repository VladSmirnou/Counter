export class classNameBuilder {
  classesToApply: Array<string> = [];

  addClass(clsName: string): void {
    this.classesToApply.push(clsName);
  }

  addClasses(...args: Array<string>): void {
    this.classesToApply.push(...args);
  }

  build(): string {
    return this.classesToApply.join(' ');
  }
}
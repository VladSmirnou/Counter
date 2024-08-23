export class CssClassNameBuilder {
  classesToApply: Array<string> = [];

  constructor(baseClass: string) {
    this.classesToApply.push(baseClass);
  }

  addClass(clsName: string): void {
    this.classesToApply.push(clsName);
  }

  addClasses(...args: Array<string>): void {
    this.classesToApply = this.classesToApply.concat(args);
  }

  build(): string {
    return this.classesToApply.join(' ');
  }
}

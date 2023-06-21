import { AbstractControl, ValidatorFn } from '@angular/forms';

export function numberLengthValidator(minLength: number, maxLength: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value: number = control.value;

    if (value === null || value === undefined || isNaN(value)) {
      return null;
    }

    const valueString: string = value.toString();

    if (valueString.length < minLength || valueString.length > maxLength) {
      return { numberLength: true };
    }

    return null;
  };
}

import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function arrayOfNumbersValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const { value } = control;

    let isValid = true;
    if (value) {
      const found = value.split(',').find((val: any) => !val || isNaN(+val));
      isValid = found === null || found === undefined;
    }

    return isValid ? null : { arrayOfNumbers: { value: control.value } };
  };
}

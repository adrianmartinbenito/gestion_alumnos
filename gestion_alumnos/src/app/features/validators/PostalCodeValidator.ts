import { AbstractControl, ValidatorFn } from '@angular/forms';

export class PostalCodeValidator {
  static validatePostalCode(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      return this._isCorrectPostalCode(control.value) == null
        ? null
        : { documento: 'Codigo Postal incorrecto' };
    };
  }

  static _isCorrectPostalCode(input: string) {
    if (
      input.length == 5 &&
      parseInt(input) >= 1000 &&
      parseInt(input) <= 52999
    ) {
      return;
    } else {
      return {
        documento: 'Codigo Postal incorrecto',
      };
    }
  }
}

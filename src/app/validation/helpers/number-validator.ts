import { AbstractControl } from '@angular/forms'

export function numberValidator(control: AbstractControl) {
  const valid = /^\d+$/.test(control.value);
    if (!valid) {
      return { badNumber: true };
    }
}

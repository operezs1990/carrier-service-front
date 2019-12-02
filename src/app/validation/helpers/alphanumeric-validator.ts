import { AbstractControl } from '@angular/forms'

export function alphanumericValidator(control: AbstractControl) {
  const valid = /^[a-zA-Z0-9 ]+$/i.test(control.value);
  if (!valid) {
    return { badAlphanumeric: true };
  }
}

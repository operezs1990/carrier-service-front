import { AbstractControl } from '@angular/forms';

export function hoursRange( control: AbstractControl) {
        let controlValue: string = control.value;

        controlValue = controlValue.replace(/:/g, '');

        const inputValue = parseInt(controlValue);

        if (inputValue > 1900) {
            return { badHourEnd: true };
        }
        return null;
}

import { AbstractControl } from '@angular/forms';

export function retiroHourIni(control: AbstractControl) {
        let controlValue: string = control.value;

        controlValue = controlValue.replace(/:/g, '');

        const inputValue = parseInt(controlValue);

        if (inputValue < 1200) {
            return { badHourIni: true };
        }
        return null;
}

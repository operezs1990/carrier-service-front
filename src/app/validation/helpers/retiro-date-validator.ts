import { AbstractControl } from '@angular/forms';

export function retiroDate(control: AbstractControl) {
        const inputValue = new Date(control.value);
        const valueInput = inputValue.getTime();
        const date = new Date();
        const valueDate = date.getTime();
        if (valueInput <= valueDate) {
            return { badDay: true };
        }
        return null;
}

import { AbstractControl } from '@angular/forms';

export function retiroDateRange(control: AbstractControl) {
        const inputValue = new Date(control.value);
        const dayOfWeek = inputValue.getDay();
        if (dayOfWeek > 4) {
            return { badDayRange: true };
        }
        return null;
}

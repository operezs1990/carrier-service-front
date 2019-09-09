import { NavigationExtras } from '@angular/router';

export class HandledError {
    public error: Error;
    public logoutCommands: any[];
    public logoutNavigationExtras?: NavigationExtras;
    public code: string;
    public formErrors: any;
    public description = '';
    constructor() {
        this.error = new Error();
    }
}

import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router, CanActivate, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
//
import { AuthService } from './auth.service';


@Injectable({
    providedIn: 'root'
})
export class AuthGuardAdminService implements CanActivate, CanLoad {

    constructor(private authService: AuthService,

                private location: Location,
                private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.authService.getUserRole() === 'admin' || this.authService.getUserRole() === 'root') {
            return true;
        }
        this.authService.loginNavigationExtras = {queryParams: {returnUrl: this.location.path()}};
        this.router.navigate(this.authService.logoutCommands);
        return false;
    }

    canLoad() {
        if (this.authService.isAuthenticated) {
            return true;
        }
        this.authService.loginNavigationExtras = {queryParams: {returnUrl: this.location.path()}};
        this.router.navigate(this.authService.logoutCommands);
        return false;
    }
}

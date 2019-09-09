import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../../service/auth/auth.service';

@Injectable({
   providedIn: 'root'
})

export class AuthGuard implements CanActivate {

   constructor(private router: Router, private userAuthService: AuthService) { }

   canActivate() {
      // if (this.userAuthService.getLocalStorageUser()) {
      // // logged in so return true
      //    return true;
      // }

      // // not logged in so redirect to login page with the return url
      // this.router.navigate(['/session/loginone'], { queryParams: { returnUrl: state.url }});
      // return false;
      if (localStorage.getItem('userToken')) {
         return true;
      }

      this.router.navigate(['/login']);
      return false;
   }
}

import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

	user 		  : Observable<firebase.User>;
	userData   : any;
   isLoggedIn = false;

   constructor(private firebaseAuth: AngularFireAuth,
               private router : Router,
               private toastr: ToastrService) { 
   	this.user = firebaseAuth.authState;
   }

   /*
    *  getLocalStorageUser function is used to get local user profile data.
    */
   getLocalStorageUser(){
      this.userData = JSON.parse(localStorage.getItem("userProfile"));
      if(this.userData) {
         this.isLoggedIn = true;
         return true;
      } else {
         this.isLoggedIn = false;
         return false;
      }    
   }

  	/*
    * signupUserProfile method save email and password into firabse &
    * signupUserProfile method save the user sign in data into local storage. 
    */
   signupUserProfile(value) {
    	this.firebaseAuth
   	.auth
      .createUserWithEmailAndPassword(value.email, value.password)
      .then(value => {
        this.toastr.success('Account Created!');
        this.setLocalUserProfile(value);
        this.router.navigate(['/']);
      })
      .catch(err => {
         this.toastr.error(err.message);
      });    
   }

   /*
    * loginUser fuction used to login.
    */
   loginUser(value) {
      this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(value.email,value.password)
      .then(value => {
         this.setLocalUserProfile(value);
         this.toastr.success('You have been successfully logged In!');
         this.router.navigate(['/']);
      })
      .catch(err => {
         this.toastr.error(err.message);
      });
   }

   /*
    * resetPassword is used to reset your password.
    */
   resetPassword(value) {
      this.firebaseAuth.auth.sendPasswordResetEmail(value.email)
         .then(value => {
          	this.toastr.success("Email Sent");
          	this.router.navigate(['/session/loginone']);
         })
         .catch(err => {
            this.toastr.error(err.message);
         });
    }

   /*
    * logOut function is used to sign out . 
    */
   logOut() {
      this.firebaseAuth
      .auth
      .signOut();
      localStorage.removeItem("userProfile");
      this.isLoggedIn = false;
      this.toastr.success("You have been successfully logged out!");
      this.router.navigate(['/session/loginone']);
   }   

   /*
    * setLocalUserProfile function is used to set local user profile data.
    */
   setLocalUserProfile(value){
   	localStorage.setItem("userProfile", JSON.stringify(value));
      this.isLoggedIn = true;
   }
}

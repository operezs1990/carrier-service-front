import { HttpClient } from '@angular/common/http';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ErrorHandlingService } from 'app/error-handling/services/error-handling.service';
import 'rxjs/Rx';
import { PageTitleService } from '../../../../../core/page-title/page-title.service';
import { RetiroService } from '../../services/retiro.service';
import { User } from 'app/shopify-app/models/user';
import { UserService } from 'app/shopify-app/modules/user/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Region } from 'app/shopify-app/models/region';
import { AuthService } from 'app/authentication/services/auth.service';
import { HandledError } from 'app/error-handling/models/handled-error';

declare var $: any;




const errorKey = 'Error';

@Component({
   selector: 'app-new-retiro',
   templateUrl: './new-retiro.component.html',
   styleUrls: ['./new-retiro.component.scss']
})
export class NewRetiroComponent implements OnInit, AfterViewInit {

   data: User;
   userId: string;
   regionList: Array<Region>;

   constructor(
      public activatedRoute: ActivatedRoute,
      public userService: UserService,
      private errorHandlingService: ErrorHandlingService,
      public router: Router,
      public authService: AuthService,
      private translate: TranslateService,
      private toastr: ToastrService) {
      // setTranslations(this.translate, TRANSLATIONS);
   }

   ngOnInit() {
      this.userId = this.authService.currentUser.id;
   }

   ngAfterViewInit() {
      this.getUser();
      // this.getRegions();
   }

   getRegions() {
      this.userService.getStaticRegions().subscribe(response => {
         this.regionList = response;
      },
         (error: HandledError) => this.errorHandlingService.handleUiError(errorKey, error)
      );
   }

   getUser() {
      this.userService.getUser(this.userId).subscribe(response => {
         this.data = response;
      },
         (error: HandledError) => this.errorHandlingService.handleUiError(errorKey, error)
      );
   }

   submit(data: User) {
      this.updateUser(data);
   }

   cancel() {
      this.close();
   }

   close() {
      //  this.router.navigate(this.activatedRoute.snapshot.data.closeRouteCommand, {relativeTo: this.activatedRoute});
   }

   updateUserLocalStorash() {
      this.authService.updateCurrentUser(this.data);
   }

   updateUser(data: User) {
      data.id = this.userId;
      data.profile = true;
      this.updateUserLocalStorash();
      this.userService.putUser(data).subscribe(response => {
         this.close();
         this.translate.get('SUCCESS_MESSAGE').subscribe((res: string) => {
            this.toastr.success(res);
         });
      },
         (error: HandledError) => {
            this.errorHandlingService.handleUiError(errorKey, error);
         });
   }
}

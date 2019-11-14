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
import { Retiro } from 'app/shopify-app/models/retiro';
import { timeDay } from 'd3';

declare var $: any;




const errorKey = 'Error';

@Component({
   selector: 'app-new-retiro',
   templateUrl: './new-retiro.component.html',
   styleUrls: ['./new-retiro.component.scss']
})
export class NewRetiroComponent implements OnInit, AfterViewInit {
   data: Retiro = {
      contact: '',
      contactPhone: '',
      date: new Date,
      horaDesde: new Date,
      horaHasta: new Date,
   };

   user: User;
   userId: string;
   regionList: Array<Region>;

   constructor(
      public activatedRoute: ActivatedRoute,
      public userService: UserService,
      public retiroService: RetiroService,
      private errorHandlingService: ErrorHandlingService,
      public router: Router,
      public authService: AuthService,
      private translate: TranslateService,
      private toastr: ToastrService) {
      // setTranslations(this.translate, TRANSLATIONS);
   }

   ngOnInit() {
      // TODO: descoment
      this.userId = this.authService.currentUser.id;
   }

   ngAfterViewInit() {
      this.getUser();
      this.getRegions();
   }

   getRegions() {
      this.userService.getStaticRegions().subscribe(response => {
         this.regionList = response;
      },
         (error: HandledError) => this.errorHandlingService.handleUiError(errorKey, error)
      );
   }

   setDataUserParams() {
      this.data.contact = this.user.firstName;
      this.data.contactPhone = this.user.phone;
      this.data.rut = this.user.rut;
      this.data.zip = this.user.zip;
      this.data.address = this.user.address;
      this.data.region = this.user.region;
      this.data.comuna = this.user.comuna;
   }

   getUser() {
      this.userService.getUser(this.userId).subscribe(response => {
         this.user = response;
         this.setDataUserParams();
      },
         (error: HandledError) => this.errorHandlingService.handleUiError(errorKey, error)
      );
   }

   submit(data: Retiro) {
     // this.updateUser(data);
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

   updateUser(data: Retiro) {
      this.updateUserLocalStorash();
      this.retiroService.postRetiro(data).subscribe(response => {
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

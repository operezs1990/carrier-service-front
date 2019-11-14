
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ErrorHandlingService } from '../../../../../error-handling/services/error-handling.service';
import { HandledError } from '../../../../../error-handling/models/handled-error';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'app/shopify-app/models/user';
import { UserService } from '../../services/user.service';
import { Region } from 'app/shopify-app/models/region';
import { AuthService } from 'app/authentication/services/auth.service';

const errorKey = 'Error';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})

export class UserEditComponent implements AfterViewInit, OnInit {

  data: User;
  userId: string;
  regionList: Array<Region>;

  constructor(
    public activatedRoute: ActivatedRoute,
    public userService: UserService,
    public authService: AuthService,
    private errorHandlingService: ErrorHandlingService,
    public router: Router,
    private translate: TranslateService,
    private toastr: ToastrService) {
    // setTranslations(this.translate, TRANSLATIONS);
  }

  ngOnInit() {
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

  getUser() {
    this.userService.getUser(this.userId).subscribe(response => {
      this.data = response;
    },
      (error: HandledError) => this.errorHandlingService.handleUiError(errorKey, error)
    );
    // this.userService.getStaticUser().subscribe(response => {
    //      this.data = response;
    //    });
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
      this.router.navigate(['/orders', data.id]);
    },
      (error: HandledError) => {
        this.errorHandlingService.handleUiError(errorKey, error);
      });
  }
}

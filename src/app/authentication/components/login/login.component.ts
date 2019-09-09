import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { CustomValidators } from 'ng2-validation';

import { ConfigService } from '../../../config/services/config.service';
import { AuthService } from '../../services/auth.service';
import { ErrorHandlingService } from '../../../error-handling/services/error-handling.service';
import { QueryParams } from 'app/authentication/models/QueryParams';

const errorKey = 'login';
const requiredUserandPasswordKey = 'Required Username and Password';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    currentLang = 'fr';

    loginForm: FormGroup;
    returnUrl: string;
    public capsLockOn: boolean;

    queryParams: QueryParams = {
        hmac: '',
        shop: '',
        timestamp: '',
        code: '',
        state: ''
    }

    urlTree: any;
    installFlag = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        public configService: ConfigService,
        private authService: AuthService,
        public translate: TranslateService,
        private toastr: ToastrService,
        private errorHandlingService: ErrorHandlingService,
        private formBuilder: FormBuilder,
        private _activatedRoute: ActivatedRoute
    ) {
        const browserLang: string = translate.getBrowserLang();
        translate.use(browserLang.match(/fr|en/) ? browserLang : 'fr');
    }

    ngOnInit() {
        this.getQueryParams();
        if (this.authService.isAuthenticated) {
            this.router.navigate(this.authService.afterLoginCommands, this.authService.afterLoginNavigationExtras);
        } else {
            this.returnUrl = this.route.snapshot.queryParams['returnUrl'];
            this.authService.loginNavigationExtras = undefined;
        }
        
    }

    getQueryParams() {

        this.urlTree = this.router.parseUrl(this.router.url);

        this.queryParams.hmac = this.urlTree.queryParams['hmac'];
        this.queryParams.shop = this.urlTree.queryParams['shop'];
        this.queryParams.timestamp = this.urlTree.queryParams['timestamp'];
        this.queryParams.code = this.urlTree.queryParams['code'];
        this.queryParams.state = this.urlTree.queryParams['state'];

        window.history.pushState(null, '', '');

        if (this.queryParams.code) {
            this.installFlag = true;
            this.authService.installApp(this.queryParams).subscribe(response => {
                this.loginAuth(this.queryParams.shop);
            });
        } else {
            this.createFormGroup();
        }
    }

    createFormGroup() {
        this.loginForm = this.formBuilder.group({
            shop: ['', [Validators.required]],
        });
    }

    loginAuth(shop: string) {
        this.authService.loginUser(shop, this.queryParams)
        .subscribe(
            resp => {
                // this.rootActions.setState(this.authService.userPreferences);
                if (this.returnUrl && this.returnUrl.length > 0) {
                    this.router.navigateByUrl(this.returnUrl);
                } else {
                    this.router.navigate(this.authService.afterLoginCommands,
                        this.authService.afterLoginNavigationExtras);
                }
            },
            error => {
                this.errorHandlingService.handleUiError(errorKey, error);
            },
        );
    }

    login() {
        const shop = this.loginForm.get('shop').value;
        if (this.authService.isAuthenticated) {
            this.router.navigate(this.authService.afterLoginCommands, this.authService.afterLoginNavigationExtras);
        } else {
            if (shop) {
                this.loginAuth(shop);
            } else {
                this.translate.get('EMAIL_PASSWORD_MESSAGE').subscribe((res: string) => {
                    this.toastr.error(res);
                });
            }
        }
    }
}

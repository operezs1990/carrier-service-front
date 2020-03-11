import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { QueryParams } from 'app/authentication/models/QueryParams';
import { ToastrService } from 'ngx-toastr';
import { ConfigService } from '../../../config/services/config.service';
import { ErrorHandlingService } from '../../../error-handling/services/error-handling.service';
import { AuthService } from '../../services/auth.service';


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
       // translate.use(browserLang.match(/fr|en/) ? browserLang : 'fr');
       translate.use('es');

    }

    ngOnInit() {
        this.getQueryParams();
        if (this.authService.isAuthenticated) {
            this.router.navigate(this.authService.afterLoginCommands, this.authService.afterLoginNavigationExtras);
        } else {
            localStorage.setItem('currentUser', null);
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
                this.toastr.success('Su aplicación ha sido instalada con éxito...!');
                this.navigateAfterLogin();
            }, error => {
                console.log('AAA', error);
            },
        );

        } else if (this.queryParams.shop) {
           this.loginAuth(this.queryParams.shop)
        } else {
           this.createFormGroup();
        }
    }

    createFormGroup() {
        const urlPattern = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'
        this.loginForm = this.formBuilder.group({
            shop: ['', [Validators.required, Validators.pattern(urlPattern)]],
        });
    }

    login() {
        if (this.authService.isAuthenticated) {
            this.router.navigate(this.authService.afterLoginCommands, this.authService.afterLoginNavigationExtras);
        } else {
            if (this.loginForm.valid) {
                let shop: string = this.loginForm.get('shop').value;
                if (shop.indexOf('https://') > -1) {
                    shop = shop.slice(8, shop.length);
                } else if (shop.indexOf('http://') > -1) {
                    shop = shop.slice(7, shop.length);
                }
                if (shop.indexOf('/') > -1) {
                    shop = shop.slice(0, shop.indexOf('/'));
                }
                this.loginAuth(shop);
            } else {
                this.translate.get('URL_MESSAGE').subscribe((res: string) => {
                    this.toastr.error(res);
                });
            }
        }
    }

    loginAuth(shop: string) {
        this.authService.loginUser(shop, this.queryParams)
        .subscribe(
            resp => {
                this.navigateAfterLogin();
            },
            error => {
                this.errorHandlingService.handleUiError(errorKey, error);
            },
        );
    }

    navigateAfterLogin() {
        if (this.returnUrl && this.returnUrl.length > 0) {
            this.router.navigateByUrl(this.returnUrl);
        } else {
            this.router.navigate(this.authService.afterLoginCommands,
                this.authService.afterLoginNavigationExtras);
        }
    }

}

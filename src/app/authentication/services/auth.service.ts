import { ActivatedRoute, NavigationCancel, NavigationExtras, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

//
import { BehaviorSubject, empty, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
//
import { ConfigService } from '../../config/services/config.service';
import { ErrorHandlingService } from '../../error-handling/services/error-handling.service';
import { ErrorHandlingHttpService } from '../../error-handling/services/error-handling-http.service';
import { LoginUser } from '../models/login-user';
import * as jwt_decode from 'jwt-decode';
import { QueryParams } from '../models/QueryParams';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    user: any;
    userDataSto: any;
    isLoggedIn = false;

    loginCommands: any[];
    loginNavigationExtras?: NavigationExtras;
    redirectCommands: any[];
    redirectNavigationExtras?: NavigationExtras;
    afterLoginCommands: any[];
    afterLoginNavigationExtras?: NavigationExtras;
    changePasswordCommands: any[];
    changePasswordNavigationExtras: NavigationExtras;
    private userSource = new BehaviorSubject<any>({});
    public userData = this.userSource.asObservable();
    public userPreferences: any;
    public userFullName$ = new BehaviorSubject<string>(null);
    public twoFactorAuthModalData$ = new BehaviorSubject<any>(null);
    public twoFactorAuthModalNavigation$ = new BehaviorSubject<string>(null);

    constructor(private http: ErrorHandlingHttpService,
        private errorHandlingService: ErrorHandlingService,
        private router: Router,
        private toastr: ToastrService,
        private configService: ConfigService,
        private translate: TranslateService,
        private activatedRoute: ActivatedRoute,
        // private localService: LocaleService,
        // private rootActions: RootActionsService
    ) {
        // setTranslations(this.translate, TRANSLATIONS);
        /*this.localService.getCurrentValue().subscribe(lang => {
            this.currentLang = lang;
        });*/
    }

    get logoutCommands(): any[] {
        return this.errorHandlingService.logoutCommands;
    }

    set logoutCommands(value: any[]) {
        this.errorHandlingService.logoutCommands = value;
    }

    get logoutNavigationExtras(): NavigationExtras {
        return this.errorHandlingService.logoutNavigationExtras;
    }

    set logoutNavigationExtras(value: NavigationExtras) {
        this.errorHandlingService.logoutNavigationExtras = value;
    }

    getHeaders(addUserOauth = false, isForm = false, addAuthorization = true): HttpHeaders {
        let requestOptions = new HttpHeaders({
            'Accept-Language': this.currentLang,
            'Content-Type': isForm ? 'application/x-www-form-urlencoded' : 'application/json',
        });

        if (this.userToken && this.userToken !== 'null') { // check 'null' because is returned this value when not exists
            if (addAuthorization) {
                requestOptions = requestOptions.append('Authorization', 'Bearer ' + this.userToken);
            }

            if (addUserOauth) {
                requestOptions = requestOptions.append('useroauth', this.userToken);
            }
        }
        return requestOptions;
    }

    get userToken(): string {
        return this.http.userToken;
    }

    set userToken(value: string) {
        this.http.userToken = value;
    }

    get currentLang(): string {
        return this.http.currentLanguage;
    }

    set currentLang(value: string) {
        this.http.currentLanguage = value;
    }

    get currentUser(): any {
        const localStorageUser = localStorage.getItem('currentUser');
        if (localStorageUser && localStorageUser !== 'null') {
            return JSON.parse(localStorageUser);
        }
        return null;
    }


    get isAuthenticated(): boolean {
        // return this.currentUser && this.currentUser !== 'null' ? true : false;
        return this.userToken && this.userToken !== 'null' ? true : false;

    }

    set currentUser(value: any) {
        localStorage.setItem('currentUser', value ? JSON.stringify(value) : null);
        this.userFullName$.next(this.loggedUserInfo());
    }

    updateCurrentUser(value: any) {
        value.newUser = false;
        localStorage.setItem('currentUser', value ? JSON.stringify(value) : null);
    }

    getDecodedAccessToken(): any {
        try {
            return jwt_decode(this.userToken);
        } catch (Error) {
            return null;
        }
    }

    getUserRole(): string {
        const userRole: string = this.getDecodedAccessToken().role;
        return userRole;
    }

    getUserId(): number {
        const userId: number = this.getDecodedAccessToken().userId;
        return userId;
    }

    loggedUserInfo() {
        const value = this.currentUser;
        let userFullname = null;

        if (value) {
            userFullname = value.first_name && value.last_name ? `${value.first_name} ${value.last_name}` : null;
            if (!userFullname) {
                userFullname = value.first_name ? value.first_name : value.last_name;
                userFullname = userFullname ? userFullname : value.username;
            }
        }
        return userFullname;
    }

    getLoggedUserInfo() {
        return this.currentUser;
    }

    installApp(data: QueryParams): Observable<any> {
        const url: string = this.configService.config.apiUrl + this.configService.config.apiConfigs.install.apiEndpoint;
        let queryParams = '';
        queryParams += '?' + `code=${data.code}` + '&'
            + `hmac=${data.hmac}` + '&'
            + `shop=${data.shop}` + '&'
            + `state=${data.state}` + '&'
            + `timestamp=${data.timestamp}` + '&';

        return this.http.get<any>(url + queryParams).pipe(map((response: LoginUser) => {
            console.log('install', response);
            if (response) {
                const token = response.token;
                const user = response.user;
                this.currentUser = user;
                this.userToken = token;
            } else {
                this.userToken = null;
                this.currentUser = null;
                //   throw new Error();
            }
        }));
    }


    loginUser(shop: string, queryParams: QueryParams, code?: string): Observable<any> {
        shop = shop.replace('+', '%2B');
        const headers = this.getHeaders(false, false, false);
        const credentials = {
            'shop': shop,
            'queryParams': queryParams
        };
        const url: string = this.configService.config.apiUrl + this.configService.config.apiConfigs.authentication.loginUser.apiEndpoint;
        return this.http.post<LoginUser>(url, credentials, { headers: headers }).pipe(map((response: LoginUser) => {
            console.log('after login', response);
            if (response.user.newUser) {
                window.location.href = response.user.redirect;
            } else if (!response.user.newUser && !response.user.hmac) {
                window.location.href = response.user.redirect;
            } else {
                const token = response.token;
                if (!token || token.length === 0) {
                    throw new Error();
                }

                this.userToken = token;
                const { user } = response;
                if (response) {
                    this.currentUser = user;
                    this.userToken = token;
                    this.translate.get('LOGIN_MESSAGE').subscribe((res: string) => {
                        this.toastr.success(res);
                    });
                } else {
                    this.currentUser = null;
                    throw new Error();
                }
                return empty();
            }
        }));
    }

    logOut(): void {
        /*let headers = this.getHeaders(false, true, false);
        let credentials = 'grant_type=password'
            + '&token=' + this.userToken;
        // Using the builtin Http of angular for prevent handling the errors and showing messages to the user
        this.http.httpClient.post(this.configService.config.apiConfigs.authentication.revokeUser.apiEndpoint,
            credentials, { headers: headers }).subscribe();*/
        this.logoutSpa();
        this.router.navigate(this.logoutCommands);
    }

    postUserPreferences(preferences: string): Observable<any> {
        const headers = this.getHeaders(true);
        return this.http.post(this.configService.config.apiConfigs.authentication.userPreferences.apiEndpoint,
            preferences);
    }

    getUserPreferences(): Observable<any> {
        const headers = this.getHeaders(true);
        return this.http.get<any>(this.configService.config.apiConfigs.authentication.userPreferences.apiEndpoint,
            { headers: headers })
            .pipe(map((response) => {
                this.userPreferences = JSON.parse(response.preferences);
                // this.rootActions.setState(this.userPreferences);TODO
                return this.userPreferences;
            }));
    }

    logoutSpa(): Observable<{}> {
        localStorage.removeItem('userToken');
        this.isLoggedIn = false;
        this.translate.get('LOGOUT_MESSAGE').subscribe((res: string) => {
            this.toastr.success(res);
        });
        this.userToken = null;
        this.currentUser = null;
        return empty();
    }

    updateExpirationTime(data): Observable<any> {
        return this.http.patch(this.configService.config.apiConfigs.authentication.tokenExpirationTime.apiEndpoint,
            data, { headers: this.getHeaders(true) });
    }

    changePassword(currentPassword: string, newPassword: string): Observable<any> {
        return this.http.patch<any>(this.configService.config.apiConfigs.authentication.changePassword.apiEndpoint, {
            old_password: currentPassword,
            new_password: newPassword
        }, { headers: this.getHeaders() });
    }

    patchUser(data: any, userId: string): Observable<any> {
        return this.http.patch<any>(this.configService.config.apiConfigs.users.apiEndpoint + userId + '/', JSON.stringify(data));
    }

    passUserData(user: any) {
        this.userSource.next(user);
    }

    /*
 *  getLocalStorageUser function is used to get local user profile data.
 */

    getLocalStorageUser() {
        this.userData = JSON.parse(localStorage.getItem('userToken'));
        if (this.userData) {
            this.isLoggedIn = true;
            return true;
        } else {
            this.isLoggedIn = false;
            return false;
        }
    }



    logOutPas() {
        localStorage.removeItem('userToken');
        this.isLoggedIn = false;
        this.translate.get('LOGOUT_MESSAGE').subscribe((res: string) => {
            this.toastr.success(res);
        });
        this.router.navigate(['/session/loginone']);
    }

    /*
     * setLocalUserProfile function is used to set local user profile data.
     */
    setLocalUserProfile(value) {
        localStorage.setItem('userToken', JSON.stringify(value));
        this.isLoggedIn = true;
    }

}

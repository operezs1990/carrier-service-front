import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { distinctUntilChanged, filter } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
//
import { HandledError } from '../models/handled-error';
import { ToastrService } from 'ngx-toastr';

const errorServerKey = 'The server encountered an internal error.';

const errorServerDownKey = 'The requested server is unavailable. Please try again later.';

const errorTitle = 'Error';

@Injectable({
    providedIn: 'root'
})
export class ErrorHandlingService {
    public serverOnline: BehaviorSubject<boolean> = new BehaviorSubject(true);
    timeOutServer$: Subscription;
    timeOutClient$: Subscription;
    showExpireNotification: Subject<number> = new Subject();

    // private timeCount = 10000;
    private toastOfServerDown: any;
    private _logoutCommands: any[];
    private _logoutNavigationExtras?: NavigationExtras;
    private showNotificationObservable: Subject<any> = new Subject();
    private timeBeforeEmmitTheSameError = 1000;
    private lastEmittedNotification: any;

    constructor(// public snackBar: MatSnackBar,
        private translate: TranslateService,
        private router: Router,
        private toastr: ToastrService) {
        // setTranslations(translate, TRANSLATIONS);
        this.onServerUp();
        this.subscriptionToNotification();
    }

    private subscriptionToNotification() {
        this.showNotificationObservable.pipe(filter((error: any) => {
            // Preventing shows more than one time the token expiration error
            if (this.lastEmittedNotification && this.lastEmittedNotification.errorMessage === error.errorMessage) {
                const differenceInMilliSeconds = error.date.getTime() - this.lastEmittedNotification.date.getTime();
                if ((differenceInMilliSeconds <= this.timeBeforeEmmitTheSameError)) {
                    return false;
                }
            }
            return true;
        })).subscribe(value => {
            this.lastEmittedNotification = value;
            this.toastr.error(value.errorMessage);
            /* this.snackBar.openFromComponent(CustomSnackbarComponent, {
                data: { messageData: value.errorMessage, messageType: 'Error' },
                duration: 2000,
                horizontalPosition: 'right',
                panelClass: ['background-color-accent'],
            }); */
        });
    }

    get logoutCommands(): any[] {
        return this._logoutCommands;
    }

    set logoutCommands(value: any[]) {
        this._logoutCommands = value;
    }

    get logoutNavigationExtras(): NavigationExtras {
        return this._logoutNavigationExtras;
    }

    set logoutNavigationExtras(value: NavigationExtras) {
        this._logoutNavigationExtras = value;
    }

    private onServerUp() {
        this.serverOnline.pipe(distinctUntilChanged()).subscribe(value => {
            if (value === true) {
                // Removing timeOutClient threat if it was provided
                if (this.timeOutClient$) {
                    this.timeOutClient$.unsubscribe();
                    this.timeOutClient$ = null;
                }
                // Removing timeOutServer threat if it was provided
                if (this.timeOutServer$) {
                    this.timeOutServer$.unsubscribe();
                    this.timeOutServer$ = null;
                }
                if (this.toastOfServerDown !== undefined && this.toastOfServerDown !== null) {
                    this.toastOfServerDown.dismiss();
                }
            }
        });
    }

    public handleServiceError(err: HttpErrorResponse): HandledError {
        // console.log('error', err);
        const handledError = new HandledError();
        if (err instanceof HttpErrorResponse) {
            // If the request have status code equal to 0 is that the spa can't reach the api
            if (err.status === 0) {
                // Setting the state of the server to down and emitting the new state
                if (this.serverOnline.getValue() === true) {
                    // Returning error code 410 corresponding to "Gone" response that means the the resource you want not exist right now
                    handledError.code = 'DISCONECTED';
                    // this.translate.get([errorServerDownKey, errorTitle]).subscribe(text => {TODO
                    // this.toastOfServerDown = this.snackBar.openFromComponent(CustomSnackbarComponent, {
                    //     data: { messageData: errorServerDownKey, messageTitle: errorTitle, messageType: 'Error' },
                    //     horizontalPosition: 'right',
                    //     panelClass: ['background-color-accent'],
                    // });
                    this.translate.get('SERVER_DOWN_MESSAGE').subscribe((res: string) => {
                        this.toastr.error(res);
                      });

                    this.serverOnline.next(false);
                }
                return handledError;
            }
            // Setting the state of the server to up if the error is not "server down"
            this.serverOnline.next(true);
            try {
                // handledError.message = err.statusText;
                // const errObj = err.error;
                // Managing error from client request
                if (err.status >= 400 && err.status < 500) {
                    return this.handlingClientErrors(err, handledError);
                } else {
                    // Handling errors in the server side
                    return this.handlingServerErrors(err, handledError);
                }
            } catch (exception) {
                /* If this code is executed is because the response from the api doesn't have a valid json format that means
                 is returning some kind of html or something else*/
                if (err.status >= 400 && err.status < 500) {
                    this.translate.get('BAD_REQUEST_MESSAGE').subscribe((res: string) => {
                        handledError.description = res;
                      });
                } else {
                    this.translate.get('SERVER_ERROR_MESSAGE').subscribe((res: string) => {
                        handledError.description = res;
                      });
                }
                return handledError;
            }
        } else {
            handledError.error = err;
            return handledError;
        }
    }

    private handlingClientErrors(error: HttpErrorResponse, handledError: HandledError): HandledError {
        // Managing authentication errors
        // Sesion expired: TODO

        // console.log('errObj', errObj);

        if (error.status === 401) {
            // redirecting the user to login page if the error is caused by token expiration
            handledError.code = error.error.code;
            handledError.logoutCommands = this.logoutCommands;
            handledError.logoutNavigationExtras = this.logoutNavigationExtras;
            handledError.description = error.error.description;
            localStorage.setItem('userToken', null);
            return handledError;

        } else if (error.error.code) {
            handledError.code = error.error.code;
            handledError.description = error.error.description;
            return handledError;

        } else {
            handledError.code = 'UNKNOW_ERROR';
            handledError.description = 'An unexpected error has occurred';
            // if (error.error.) {
            //     this.translate.get(/*errorClientKey*/errObj.error).subscribe(text => {
            //         handledError.description = text;
            //     });
            //     return handledError;
            // }
            return handledError;
        }
    }

    private handlingServerErrors(error: HttpErrorResponse, handledError: HandledError): HandledError {
        // if (errObj.detail) {
        //     handledError.description = errObj.detail[0];
        //     return handledError;
        // } else {
        //     // Managing all the remaining errors as a server side errors
        //     this.translate.get(errorServerKey).subscribe(text => {
        //         handledError.description = text;
        //     });
        //     return handledError;
        // }
        handledError.code = 'SERVER_ERROR';
        handledError.description = 'Internal Server Error';
        return handledError;
    }

    public handleUiError(key: string, err: any, url?: string) {
        const serverState = this.serverOnline.getValue();
        const error = <any>err.error;
        // If server state is online then continues managing the
        if (serverState) {
            // Displaying the error if it really contains a message
            error.message = error.description;
            if (error.message) {
                // if (error.message === 'DUPLICATE_ENTITY') {
                //     switch (url) {
                //         case 'user': {
                //             error.message = 'This user already exists';
                //             break;
                //         }
                //     }
                // }
                this.showNotificationObservable.next({
                    key: key,
                    errorMessage: error.message,
                    errorCode: error.errorCode,
                    date: new Date()
                });
            }
            if (error.logoutCommands) {
                this.router.navigate(error.logoutCommands, error.logoutNavigationExtras);
            }
        }
    }

    private errorDaemon(path: string[], error: any, handledError: HandledError): void {
        if (error.constructor === Object) {
            Object.keys(error).forEach((key) => {
                path.push(key);
                this.errorDaemon(path, error[key], handledError);
                path.pop();
            });
        } else {
            const pathStr = this.capitalizeWord(path.join('.'));
            const errorStr = this.capitalizeWord(error.constructor === Array ? error.join(' ') : error);
            if (handledError.description === '' || handledError.description === undefined) {
                handledError.description = pathStr + ': ' + errorStr + '\n';
            } else {
                handledError.description = handledError.description + pathStr + ': ' + ' ' + errorStr + '\n';
            }
        }
    }

    private buildingErrorMessage(error: any, handledError: HandledError) {
        // Checking if the error comes with more than one validation error
        if (error.detail[0].constructor === Object) {
            const path = [];
            this.errorDaemon(path, error.detail[0], handledError);
            // sending the form validations errors to the component where are the fields
            handledError.formErrors = error.detail[0];
        } else {
            handledError.description = error.detail[0];
        }
    }

    private capitalizeWord(word: any): string {
        return typeof word === 'string' ? word.charAt(0).toUpperCase() + word.slice(1) : word;
    }
}


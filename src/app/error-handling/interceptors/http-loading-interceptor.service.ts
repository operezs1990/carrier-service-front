import { Injectable } from '@angular/core';
import {
    HttpClient,
    HttpEvent,
    HttpHandler,
    HttpHeaders,
    HttpInterceptor,
    HttpParams,
    HttpRequest,
    HttpResponse
} from '@angular/common/http';
//
import { tap, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
//
import { ErrorHandlingService } from '../services/error-handling.service';
import { LoadingService } from '../../http-request-indicator/services/loading.service';

export interface RequestOptions {
    headers?: HttpHeaders;
    observe?: 'body';
    params?: HttpParams;
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
    body?: any;
}


@Injectable({
    providedIn: 'root'
})
export class HttpLoadingInterceptorService implements HttpInterceptor {

    protected _currentLanguage = '';

    private totalRequests = 0;

    constructor(
        public httpClient: HttpClient,
        private errorHandlingService: ErrorHandlingService,
        public loadingService: LoadingService
    ) {

    }

    get userToken(): string {
        return localStorage.getItem('userToken');
    }

    set userToken(value: string) {
        localStorage.setItem('userToken', value);
    }

    get currentLanguage(): string {
        return this._currentLanguage;
    }

    set currentLanguage(value: string) {
        this._currentLanguage = value;
    }

    public getHeaders(): HttpHeaders {
        let requestOptions = new HttpHeaders({
            'Accept-Language': this.currentLanguage ? this.currentLanguage : '',
            'Content-Type': 'application/json',
        });
        if (this.userToken && this.userToken !== 'null') { // check 'null' because is returned this value when not exists
            requestOptions = requestOptions.append('Authorization', 'Bearer ' + this.userToken);
        }
        return requestOptions;
    }

    public getRequestOptionArgs(request: HttpRequest<any>): HttpRequest<any> {
        if (request.headers.keys().length === 0) {
            const headers = this.getHeaders();
            if (headers.get('Authorization')) {
                return request.clone({
                    setHeaders: {
                        'Accept-Language': headers.get('Accept-Language'),
                        'Content-Type': headers.get('Content-Type'),
                        'Authorization': headers.get('Authorization'),
                    }
                });
            } else {
                return request.clone({
                    setHeaders: {
                        'Accept-Language': headers.get('Accept-Language'),
                        'Content-Type': headers.get('Content-Type'),
                    }
                });
            }
        } else {
            return request;
        }
    }

    intercept(request: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {
        // request = this.getRequestOptionArgs(request);
        this.totalRequests++;
        this.loadingService.loading$.next(true);
        return next.handle(request).pipe(
            tap(res => {
                if (res instanceof HttpResponse) {
                    this.decreaseRequests();
                }
            },
                error => {
                    this.loadingService.loading$.next(false);
                },
                () => {
                    this.loadingService.loading$.next(false);
                }
            ));
    }

    public decreaseRequests() {
        this.totalRequests--;
        if (this.totalRequests === 0) {
            this.loadingService.loading$.next(false);
        }
    }
}

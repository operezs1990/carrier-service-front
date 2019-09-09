

import { Injectable } from '@angular/core';
import { ErrorHandlingHttpService } from '../../../../error-handling/services/error-handling-http.service';

//
import { ConfigService } from '../../../../config/services/config.service';
import { Observable } from 'rxjs';
import { User } from 'app/shopify-app/models/user';
import { Comuna } from 'app/shopify-app/models/comuna';
import { Region } from 'app/shopify-app/models/region';


export const ASCENDING = 'asc';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    apiUrl: string;
    apiChamberEndpoint: string;
    apiUserEndpoint: string;


    constructor(
        private configService: ConfigService,
        private http: ErrorHandlingHttpService) {
        this.apiUrl = this.configService.config.apiUrl;
        this.apiUserEndpoint = this.apiUrl + this.configService.config.apiConfigs.users.apiEndpoint;
    }

    getUser(userId): Observable<User> {
        return this.http.get<User>(this.apiUserEndpoint + userId);
    }

    getComunas(): Observable<Comuna[]> {
        return this.http.get<Comuna[]>(this.apiUserEndpoint);
    }

    getRegions(): Observable<Region[]> {
        return this.http.get<Region[]>(this.apiUserEndpoint);
    }

    putUser(data: User): Observable<User> {
        return this.http.put<User>(this.apiUserEndpoint + data.id, JSON.stringify(data));
    }

    postUser(data: User): Observable<User> {
        return this.http.post<User>(this.apiUserEndpoint, JSON.stringify(data));
    }

    getStaticRegions(): Observable<Region[]> {
        return this.http.get<Region[]>('assets/data/regiones-comunas.json').map(response => response);
    }

    getStaticUser(): Observable<User> {
        return this.http.get<User>('assets/data/user.json').map(response => response);
    }

}



import { Injectable } from '@angular/core';
//
import { Observable } from 'rxjs';
//
import { ConfigService } from '../../../../config/services/config.service';
import { ErrorHandlingHttpService } from '../../../../error-handling/services/error-handling-http.service';
import { Retiro } from 'app/shopify-app/models/retiro';
import { map } from 'rxjs/operators';

export const ASCENDING = 'asc';

@Injectable({
    providedIn: 'root'
})
export class RetiroService {

    apiEndpoint: string;

    // public companyList = new BehaviorSubject<Company[]>();

    constructor(
        private configService: ConfigService,
        private http: ErrorHandlingHttpService) {
        this.apiEndpoint = this.configService.config.apiUrl + this.configService.config.apiConfigs.withdrawal.apiEndpoint;
    }

    getRetiros(filter: any): Observable<Retiro[]> {
        const queryParams = this.formatQueryParams(filter);
        return this.http.get<Retiro[]>(this.apiEndpoint + queryParams);
    }

    postRetiro(data: Retiro): Observable<Retiro> {
        return this.http.post<Retiro>(this.apiEndpoint, JSON.stringify(data));
    }

    getRetiro(id: string): Observable<Retiro> {
        return this.http.get<Retiro>(this.apiEndpoint + id);
    }

    formatQueryParams(filter?: any, sortColumn?: string, sortDirection?: string, pageIndex?: number, pageSize?: number): string {
        let queryParams = '';

        if (filter.name) {
            queryParams += queryParams.length > 0 ? '&' : '?';
            queryParams += `name=${filter.name}`;
        }
        if (filter.size && filter.size !== '') {
            queryParams += queryParams.length > 0 ? '&' : '?';
            queryParams += `companySizeId=${filter.size}`;
        }
        if (filter.sector && filter.sector !== '') {
            queryParams += queryParams.length > 0 ? '&' : '?';
            queryParams += `activitySectorId=${filter.sector}`;
        }
        if (filter.rangeDate) {
            queryParams += queryParams.length > 0 ? '&' : '?';
            queryParams += `startDate=${new Date(filter.rangeDate.start).toISOString() }` + '&';
            queryParams += `endDate=${new Date(filter.rangeDate.end).toISOString()}`;
        }

        return queryParams;
    }

    getStaticRetiros(): Observable<Retiro[]> {
        return this.http.get<Retiro[]>('assets/data/retiros.json').pipe(map(response => response));
    }

    getStaticRegionsComunas(): Observable<any[]> {
        return this.http.get<any[]>('assets/data/regiones-comunas.json').pipe(map(response => response));
    }

    getStaticSucursales(): Observable<any[]> {
        return this.http.get<any[]>('assets/data/sucursales.json').pipe(map(response => response));
    }

}


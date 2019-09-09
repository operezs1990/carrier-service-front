
import { Injectable } from '@angular/core';
//
import { Observable } from 'rxjs';
//
import { ConfigService } from '../../../../config/services/config.service';
import { ErrorHandlingHttpService } from '../../../../error-handling/services/error-handling-http.service';
import { Manifest } from 'app/shopify-app/models/manifest';
import { ManifestRecord } from 'app/shopify-app/models/manifest-rows';


export const ASCENDING = 'asc';

@Injectable({
    providedIn: 'root'
})
export class ManifestService {

    apiEndpoint: string;

    // public companyList = new BehaviorSubject<Company[]>();

    constructor(
        private configService: ConfigService,
        private http: ErrorHandlingHttpService) {
      //  this.apiEndpoint = this.configService.config.apiUrl + this.configService.config.apiConfigs.company.apiEndpoint;
    }

    getManifestRecords(filter: any): Observable<ManifestRecord[]> {
        const queryParams = this.formatQueryParams(filter);
        return this.http.get<ManifestRecord[]>(this.apiEndpoint + queryParams);
    }

    getManifestRecord(id: string): Observable<ManifestRecord> {
        return this.http.get<ManifestRecord>(this.apiEndpoint + id);
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

    getStaticManifestRecords(): Observable<ManifestRecord[]> {
        return this.http.get<ManifestRecord[]>('assets/data/manifest.json').map(response => response);
    }

    // getAllcompanies(): Observable<Order[]> {
    //     return this.http.get<{ data: Order[] }>(this.apiEndpoint)
    //         .pipe(map(response => {
    //             return response.data;
    //         }));
    // }

}


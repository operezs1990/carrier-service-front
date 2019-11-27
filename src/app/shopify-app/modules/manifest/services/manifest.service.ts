
import { Injectable } from '@angular/core';
//
import { Observable } from 'rxjs';
//
import { ConfigService } from '../../../../config/services/config.service';
import { ErrorHandlingHttpService } from '../../../../error-handling/services/error-handling-http.service';
import { Manifest } from 'app/shopify-app/models/manifest';
import { ManifestRecord } from 'app/shopify-app/models/manifest-rows';
import { map } from 'rxjs/operators';


export const ASCENDING = 'asc';

@Injectable({
    providedIn: 'root'
})
export class ManifestService {

    apiEndpoint: string;

    constructor(
        private configService: ConfigService,
        private http: ErrorHandlingHttpService) {
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
        if (filter.rangeDate) {
            queryParams += queryParams.length > 0 ? '&' : '?';
            queryParams += `startDate=${new Date(filter.rangeDate.start).toISOString() }` + '&';
            queryParams += `endDate=${new Date(filter.rangeDate.end).toISOString()}`;
        }

        return queryParams;
    }

    getStaticManifestRecords(): Observable<ManifestRecord[]> {
        return this.http.get<ManifestRecord[]>('assets/data/manifest.json').pipe(map(response => response));
    }

}


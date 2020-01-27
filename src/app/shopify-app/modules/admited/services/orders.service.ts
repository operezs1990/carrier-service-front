
import { Injectable } from '@angular/core';
//
import { Observable, throwError } from 'rxjs';
//
import { ConfigService } from '../../../../config/services/config.service';
import { ErrorHandlingHttpService } from '../../../../error-handling/services/error-handling-http.service';
import { Order } from 'app/shopify-app/models/order';
import { Admited } from 'app/shopify-app/models/admited';
import { map } from 'rxjs/operators';

import { saveAs } from 'file-saver';
import { HttpClient } from '@angular/common/http';

export const ASCENDING = 'asc';

@Injectable({
    providedIn: 'root'
})
export class AdmitedService {

    apiEndpoint: string;

    apiEndpointLabel: string

    apiEndpointAdmission: string


    constructor(
        private configService: ConfigService,
        private http: ErrorHandlingHttpService,
        private httpClient: HttpClient) {
        this.apiEndpoint = this.configService.config.apiUrl + this.configService.config.apiConfigs.orders.apiEndpoint;
        this.apiEndpointLabel = this.configService.config.apiUrl + this.configService.config.apiConfigs.label.apiEndpoint;
        this.apiEndpointAdmission = this.configService.config.apiUrl + this.configService.config.apiConfigs.admission.apiEndpoint;

    }

    postAdmission(orderId: string): Observable<any[]> {
        return this.http.post<any[]>(this.apiEndpointAdmission + `?orderId=${orderId}`, '');
    }

    getAdmiteds(filter?: any): Observable<Admited[]> {
     //   const queryParams = this.formatQueryParams(filter);
    //    return this.http.get<Admited[]>(this.apiEndpoint + queryParams);
        return this.http.get<Admited[]>(this.apiEndpoint);

    }

    getAdmited(id: string): Observable<Admited> {
        return this.http.get<Admited>(this.apiEndpoint + id);
    }

    getLabel(order: Admited, labelForm: string) {
        const labelFormat = labelForm === 'pdf' || labelForm === 'pdfs' ? 'pdf' : labelForm;
        const myUrl = this.apiEndpointLabel + '?orderId=' + order.id;
        const mediaType = 'application/pdf';
        this.httpClient.post(myUrl, { location: `${order.orderNumber}` + '.' + labelFormat }, { responseType: 'blob'}).subscribe(
            (response) => {
                const blob = new Blob([response], { type: mediaType });
                saveAs(blob, `${order.orderNumber}` + '.' + labelFormat);
            },
            e => { throwError(e); }
        );

    }

    formatQueryParams(filter?: any, sortColumn?: string, sortDirection?: string, pageIndex?: number, pageSize?: number): string {
        let queryParams = '';

        if (filter.name) {
            queryParams += queryParams.length > 0 ? '&' : '?';
            queryParams += `name=${filter.name}`;
        }
        if (filter.rangeDate) {
            queryParams += queryParams.length > 0 ? '&' : '?';
            queryParams += `startDate=${new Date(filter.rangeDate.start).toISOString()}` + '&';
            queryParams += `endDate=${new Date(filter.rangeDate.end).toISOString()}`;
        }

        return queryParams;
    }

    getStaticOrders(): Observable<Order[]> {
        return this.http.get<Order[]>('assets/data/orders.json').pipe(map(response => response));
    }


}


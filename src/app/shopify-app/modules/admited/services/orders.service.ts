
import { Injectable } from '@angular/core';
//
import { Observable, throwError } from 'rxjs';
//
import { ConfigService } from '../../../../config/services/config.service';
import { ErrorHandlingHttpService } from '../../../../error-handling/services/error-handling-http.service';
import { Order } from 'app/shopify-app/models/order';
import { Admited } from 'app/shopify-app/models/admited';
import { map } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Ids } from 'app/shopify-app/models/ids';

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

    postAdmission(orderId: string): Observable<any> {
        return this.http.post<any>(this.apiEndpointAdmission, { orderId: orderId });
    }

    postBulkAdmission(orderIds: Ids): Observable<any> {
        return this.http.post<any>(`${this.apiEndpointAdmission}/bulk`, JSON.stringify(orderIds));
    }

    getAdmiteds(filter?: any): Observable<Admited[]> {
        const queryParams = this.formatQueryParams(filter);
        return this.http.get<Admited[]>(this.apiEndpoint + queryParams);
        // return this.http.get<Admited[]>(this.apiEndpoint);

    }

    getAdmited(id: string): Observable<Admited> {
        return this.http.get<Admited>(this.apiEndpoint + id);
    }

    getLabel(order: Admited, labelForm: string, labelFormat: string): Observable<any> {
        const myUrl = this.apiEndpointLabel + '?orderId=' + order.id;
        return this.httpClient.post(myUrl, { location: `${order.orderNumber}` + '.' + labelFormat }, { responseType: 'blob' });

    }

    formatQueryParams(filter?: any, sortColumn?: string, sortDirection?: string, pageIndex?: number, pageSize?: number): string {
        let queryParams = '';

        if (filter) {
            if (filter.status) {
                queryParams += queryParams.length > 0 ? '&' : '?';
                queryParams += `status=${filter.status}`;
            }
        }

        return queryParams;
    }

    getStaticOrders(): Observable<Order[]> {
        return this.http.get<Order[]>('assets/data/orders.json').pipe(map(response => response));
    }

    deleteOrder(id: string): Observable<any> {
        return this.http.delete<any>(this.apiEndpoint + id);
    }
}


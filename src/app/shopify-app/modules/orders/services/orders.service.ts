
import { Injectable } from '@angular/core';
//
import { Observable } from 'rxjs';
//
import { ConfigService } from '../../../../config/services/config.service';
import { ErrorHandlingHttpService } from '../../../../error-handling/services/error-handling-http.service';
import { Order } from 'app/shopify-app/models/order';
import { map } from 'rxjs/operators';

export const ASCENDING = 'asc';

@Injectable({
    providedIn: 'root'
})
export class OrdersService {

    apiEndpoint: string;

    // public companyList = new BehaviorSubject<Company[]>();

    constructor(
        private configService: ConfigService,
        private http: ErrorHandlingHttpService) {
       // this.apiEndpoint = this.configService.config.apiUrl + this.configService.config.apiConfigs.company.apiEndpoint;
    }

    getOrders(filter: any): Observable<Order[]> {
        const queryParams = this.formatQueryParams(filter);
        return this.http.get<Order[]>(this.apiEndpoint + queryParams);
    }

    getOrder(id: string): Observable<Order> {
        return this.http.get<Order>(this.apiEndpoint + id);
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

    getStaticOrders(): Observable<Order[]> {
        return this.http.get<Order[]>('assets/data/orders.json').pipe(map(response => response));
    }

    // getAllcompanies(): Observable<Order[]> {
    //     return this.http.get<{ data: Order[] }>(this.apiEndpoint)
    //         .pipe(map(response => {
    //             return response.data;
    //         }));
    // }

}


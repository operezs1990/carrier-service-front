import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpRequestIndicator } from '../models/http-request-indicator';

@Injectable({
    providedIn: 'root'
})
export class HttpRequestIndicatorsService {

    private indicators: Array<HttpRequestIndicator> = [];

    constructor() {}

    public registerIndicator(uid: string, urlExpressions: Array<string>): BehaviorSubject<boolean> {
        const indicator = new HttpRequestIndicator(uid, urlExpressions);
        this.indicators.push(indicator);
        return indicator.show;
    }

    public unregisterIndicator(uid: string) {
        this.indicators.splice(this.indicators.map(indicator => indicator.uid).indexOf(uid), 1);
    }

    public findIndicators(url: string): Array<HttpRequestIndicator> {
        const indicators: Array<HttpRequestIndicator> = [];
        for (let i = 0; i < this.indicators.length; i++) {
            const indicator = this.indicators[i];
            for (let j = 0; j < indicator.urlExpressions.length; j++) {
                const expression = indicator.urlExpressions[j];
                const pattern = new RegExp(expression);
                if (pattern.test(url)) {
                    indicators.push(indicator);
                    break;
                }
            }
        }
        return indicators;
    }

    setLoading(flag: boolean) {

    }
}

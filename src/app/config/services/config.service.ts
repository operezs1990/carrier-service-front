import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { ErrorHandlingHttpService } from '@c/error-handling';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  public config: any;

  constructor(private http: HttpClient) { }

  public getConfig(): Observable<any> {
    return this.http.get<any>('assets/data/config.json').pipe(map((response) => {
      this.config = response;
    }));
  }
}

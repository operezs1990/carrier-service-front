import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
//
import { TranslateModule } from '@ngx-translate/core';
//
// import { NgxTranslateModule } from '../../ngx-translate';TODO
import { HttpHeadersInterceptorService } from './interceptors/http-headers-interceptor.service';
import { ErrorHandlingInterceptorService } from './interceptors/error-handling-interceptor.service';
import { HttpLoadingInterceptorService } from './interceptors/http-loading-interceptor.service';
import { ToastrService } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HttpHeadersInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorHandlingInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpLoadingInterceptorService, multi: true },
    ToastrService],
  declarations: [],
  exports: []
})
export class ErrorHandlingModule {
}

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CdkTableModule } from '@angular/cdk/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from '@agm/core';
import { TourNgBootstrapModule } from 'ngx-tour-ng-bootstrap';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SidebarModule } from 'ng-sidebar';
import { ToastrModule } from 'ngx-toastr';
import 'hammerjs';

import { ChankyaAppComponent } from './app.component';
import { RoutingModule } from './app-routing.module';
import { AuthComponent } from './auth/auth.component';
import { MenuToggleModule } from './core/menu/menu-toggle.module';
import { MenuItems } from './core/menu/menu-items/menu-items';
import { PageTitleService } from './core/page-title/page-title.service';
//
import { AuthService } from './service/auth/auth.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { ConfigModule } from './config/config.module';
import { ErrorHandlingModule } from './error-handling/error-handling.module';
import { HttpRequestIndicatorModule } from './http-request-indicator/http-request-indicator.module';
import { LoadingComponent } from './http-request-indicator/components/loading/loading.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { NgrxModule } from './ngrx/ngrx.module';
import { ConfirmDialogModule } from './confirm-dialog/confirm-dialog.module';
import { ConfirmDialogComponent } from './confirm-dialog/components/confirm-dialog.component';

/********** Custom option for ngx-translate ******/
export function createTranslateLoader(http: HttpClient) {
	return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
	suppressScrollX: true
};

const perfectScrollbarConfig: PerfectScrollbarConfigInterface = {
	suppressScrollX: true
};

@NgModule({
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		ReactiveFormsModule,
		CdkTableModule,
		SidebarModule.forRoot(),
		RoutingModule,
		TourNgBootstrapModule.forRoot(),
		NgbModalModule.forRoot(),
		AgmCoreModule.forRoot({ apiKey: 'AIzaSyBtdO5k6CRntAMJCF-H5uZjTCoSGX95cdk' }),
		PerfectScrollbarModule,
		MenuToggleModule,
		HttpClientModule,
		OverlayModule,
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: createTranslateLoader,
				deps: [HttpClient]
			}
		}),
		ToastrModule.forRoot({
			timeOut: 2000,
			preventDuplicates: true
		}),

		AuthenticationModule,
		ConfigModule,
		ErrorHandlingModule,
		HttpRequestIndicatorModule,
		NgrxModule,
		ConfirmDialogModule,
	],
	declarations: [
		ChankyaAppComponent,
		AuthComponent,
	],
	bootstrap: [ChankyaAppComponent],
	providers: [
		MenuItems,
		PageTitleService,
		AuthService,
		{
			provide: PERFECT_SCROLLBAR_CONFIG,
			useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
		}
	],
    entryComponents: [
        LoadingComponent,
        ConfirmDialogComponent,
    ]

})
export class ChankyaAppModule { }

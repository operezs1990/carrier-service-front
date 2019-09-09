
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MainComponent } from './components/main/main.component';
import { SidebarModule } from 'ng-sidebar';
import { PerfectScrollbarModule, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TourNgBootstrapModule } from 'ngx-tour-ng-bootstrap';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ConfirmDialogModule } from 'app/confirm-dialog/confirm-dialog.module';
import { ShopifyAppRoutingModule } from './shopify-app-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SidebarModule.forRoot(),
    ShopifyAppRoutingModule,
    PerfectScrollbarModule,
    TourNgBootstrapModule.forRoot(),
    TranslateModule,
    ConfirmDialogModule,
  ],
  declarations: [
    MainComponent,
  ],
})
export class ShopifyAppModule { }

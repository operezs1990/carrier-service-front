import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DateRangePickerModule } from '@uiowa/date-range-picker';
import { ArchwizardModule } from 'ng2-archwizard';

import { SlickCarouselModule } from 'ngx-slick-carousel'
import { ManifestTableComponent } from './components/manifest-table/manisfest-table.component';
import { ManifestRoutingModule } from './manifest-routing.module';
import { NgxBarcodeModule } from 'ngx-barcode';
import { ManifestHeaderComponent } from './components/manifest-header/manifest-header.component';
import { ManifestRowsComponent } from './components/manifest-rows/manifest-rows.component';
import { ManifestComponent } from './components/manifest/manisfest.component';
import { ManifestFooterComponent } from './components/manifest-footer/manifest-footer.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ManifestRoutingModule,
    NgbDatepickerModule,
    ArchwizardModule,
    NgxDatatableModule,
    DateRangePickerModule,
    SlickCarouselModule,
    TranslateModule,
    NgxBarcodeModule
  ],
  declarations: [
    ManifestComponent,
    ManifestTableComponent,
    ManifestHeaderComponent,
    ManifestRowsComponent,
    ManifestFooterComponent
  ]
})
export class ManifestModule { }

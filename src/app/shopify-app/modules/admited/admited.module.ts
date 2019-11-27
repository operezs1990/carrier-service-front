import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {NgxPaginationModule} from 'ngx-pagination';
import { DateRangePickerModule } from '@uiowa/date-range-picker';
import { ArchwizardModule } from 'ng2-archwizard';

import { SlickCarouselModule } from 'ngx-slick-carousel'
import { AdmitedRoutingModule } from './admited-routing.module';
import { AdmitedTableComponent } from './components/admited-table/admited-table.component';
import { AdmitedDetailsComponent } from './components/admited-details/admited-details.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdmitedRoutingModule,
    NgbDatepickerModule,
    ArchwizardModule,
    NgxDatatableModule,
    DateRangePickerModule,
    SlickCarouselModule,
    TranslateModule,
    NgxPaginationModule,
  ],
  declarations: [
    AdmitedTableComponent,
    AdmitedDetailsComponent,
  ],
  exports: [
    AdmitedTableComponent,
  ]
})
export class AdmitedModule { }

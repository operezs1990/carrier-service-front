import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DateRangePickerModule } from '@uiowa/date-range-picker';
import { ArchwizardModule } from 'ng2-archwizard';

import { SlickCarouselModule } from 'ngx-slick-carousel'
import { RetiroTableComponent } from './components/retiro-table/retiro-table.component';
import { RetiroFormComponent } from './components/retiro-form/retiro-form.component';
import { NewRetiroComponent } from './components/new-retiro/new-retiro.component';
import { RetiroRoutingModule } from './retiro-routing.module';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { AdmitedModule } from '../admited/admited.module';
import { RetiroDetailsComponent } from './components/retiro-details/retiro-details.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2Rut } from 'ng2-rut';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RetiroRoutingModule,
    NgbDatepickerModule,
    ArchwizardModule,
    NgxDatatableModule,
    NgxMyDatePickerModule.forRoot(),
    DateRangePickerModule,
    SlickCarouselModule,
    TranslateModule,
    AdmitedModule,
    NgxPaginationModule,
    Ng2Rut,
  ],
  declarations: [
    RetiroTableComponent,
    RetiroFormComponent,
    NewRetiroComponent,
    RetiroDetailsComponent,
  ],
  exports: [
  ],
})
export class RetiroModule { }

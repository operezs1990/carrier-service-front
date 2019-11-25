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
  ],
  declarations: [
    RetiroTableComponent,
    RetiroFormComponent,
    NewRetiroComponent
  ],
  exports: [
  ],
})
export class RetiroModule { }

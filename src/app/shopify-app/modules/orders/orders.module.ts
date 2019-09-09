import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DateRangePickerModule } from '@uiowa/date-range-picker';
import { ArchwizardModule } from 'ng2-archwizard';

import { SlickCarouselModule } from 'ngx-slick-carousel'
import { OrdersDetailsComponent } from './components/orders-details/orders-details.component';
import { OrdersTableComponent } from './components/orders-table/orders-table.component';
import { OrdersRoutingModule } from './orders-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    OrdersRoutingModule,
    NgbDatepickerModule,
    ArchwizardModule,
    NgxDatatableModule,
    DateRangePickerModule,
    SlickCarouselModule,
    TranslateModule,
  ],
  declarations: [
    OrdersTableComponent,
    OrdersDetailsComponent,
  ]
})
export class OrdersModule { }

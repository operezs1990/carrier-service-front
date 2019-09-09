import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DateRangePickerModule } from '@uiowa/date-range-picker';
import { ArchwizardModule } from 'ng2-archwizard';

import { SlickCarouselModule } from 'ngx-slick-carousel'
import { ArchivesRoutingModule } from './archives-routing.module';
import { ArchivesTableComponent } from './components/archives-table/archives-table.component';
import { ArchivesDetailsComponent } from './components/archives-details/archives-details.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ArchivesRoutingModule,
    NgbDatepickerModule,
    ArchwizardModule,
    NgxDatatableModule,
    DateRangePickerModule,
    SlickCarouselModule,
    TranslateModule,
  ],
  declarations: [
    ArchivesTableComponent,
    ArchivesDetailsComponent,
  ]
})
export class ArchivesModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DateRangePickerModule } from '@uiowa/date-range-picker';
import { ArchwizardModule } from 'ng2-archwizard';

import { SlickCarouselModule } from 'ngx-slick-carousel'
import { NgxBarcodeModule } from 'ngx-barcode';
import { LabelRoutingModule } from './label-routing.module';
import { LabelComponent } from './components/label/label.component';
import { LabelHeaderComponent } from './components/label-header/label-header.component';
import { LabelBodyComponent } from './components/label-body/label-body.component';
import { LabelFooterComponent } from './components/label-footer/label-footer.component';
import { LabelFooterOneComponent } from './components/label-footer-one/label-footer-one.component';
import { LabelFooterThreComponent } from './components/label-footer-thre/label-footer-thre.component';
import { LabelFooterTwoComponent } from './components/label-footer-two/label-footer-two.component';
import { LabelHeaderLeftLogoProdComponent } from './components/label-header-left-logo-prod/label-header-left-logo-prod.component';
import { LabelHeaderRightComponent } from './components/label-header-right/label-header-right.component';
import { LabelHeaderRightOneComponent } from './components/label-header-right-one/label-header-right-one.component';
import { LabelHeaderRightTwoComponent } from './components/label-header-right-two/label-header-right-two.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LabelRoutingModule,
    NgbDatepickerModule,
    ArchwizardModule,
    NgxDatatableModule,
    DateRangePickerModule,
    SlickCarouselModule,
    TranslateModule,
    NgxBarcodeModule
  ],
  declarations: [
    LabelComponent,
    LabelHeaderComponent,
    LabelBodyComponent,
    LabelFooterComponent,
    LabelFooterOneComponent,
    LabelFooterThreComponent,
    LabelFooterTwoComponent,
    LabelHeaderLeftLogoProdComponent,
    LabelHeaderRightComponent,
    LabelHeaderRightOneComponent,
    LabelHeaderRightTwoComponent,
  ]
})
export class LabelModule { }

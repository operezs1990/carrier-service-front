import { Component, OnInit, OnDestroy, Input, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ErrorHandlingService } from 'app/error-handling/services/error-handling.service';
import 'rxjs/Rx';
import { Region } from 'app/shopify-app/models/region';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Comuna } from 'app/shopify-app/models/comuna';
import { User } from 'app/shopify-app/models/user';
import { Subscription } from 'rxjs/Rx';
import { ToastrService } from 'ngx-toastr';
import { debounceTime } from 'rxjs/operators';
import { Retiro } from 'app/shopify-app/models/retiro';
import { retiroDate } from 'app/validation/helpers/retiro-date-validator';
import { retiroHourEnd } from 'app/validation/helpers/retiro-hourEnd-validator';
import { retiroHourIni } from 'app/validation/helpers/retiro-hourIni-validator';
import { retiroDateRange } from 'app/validation/helpers/retiro-date-range-validator';



declare var $: any;




const errorKey = 'Error';

@Component({
   selector: 'app-retiro-form',
   templateUrl: './retiro-form.component.html',
   styleUrls: ['./retiro-form.component.scss']
})
export class RetiroFormComponent implements OnInit, OnDestroy {

   wasSubmitted = false;

   @Input() regionList: Array<Region>;

   comunaList: Array<Comuna> = [];

   comunaSelectEnable = false;

   public formGroup: FormGroup;

   @Output() cancel = new EventEmitter();

   @Input() data: Retiro;

   @Output() accept = new EventEmitter<Retiro>();

   regionValueChanges: Subscription;

   constructor(public translateService: TranslateService,
      public activatedRoute: ActivatedRoute,
      private toastr: ToastrService,
      public router: Router,
      private fb: FormBuilder,
      public translate: TranslateService
   ) { }

   ngOnInit() {
      this.createFormGroup();
      this.regionValueChanges = this.formGroup.controls.region.valueChanges.pipe(debounceTime(500))
         .subscribe(change => this.comunaListFilter(this.formGroup.value.region));
      if (this.data.region) {
         this.comunaListFilter(this.data.region)
      }
   }

   ngOnDestroy() {
      this.regionValueChanges.unsubscribe();
   }

   createFormGroup() {
      this.formGroup = this.fb.group({
         contact: [this.data.contact, Validators.compose([Validators.required])],
         contactPhone: [this.data.contactPhone, Validators.compose([Validators.required])],
         date: ['', Validators.compose([Validators.required, retiroDate, retiroDateRange])],
         horaDesde: ['', Validators.compose([Validators.required, retiroHourIni])],
         horaHasta: ['', Validators.compose([Validators.required, retiroHourEnd])],

         rut: [this.data.rut, Validators.compose([Validators.required])],
         address: [this.data.address, Validators.compose([Validators.required])],
         comuna: [this.data.comuna, Validators.compose([Validators.required])],
         region: [this.data.region, Validators.compose([Validators.required])],
         zip: [this.data.zip, Validators.compose([Validators.required])],
      }, { validator: this.hoursRange });
      if (!this.data.region) {
         this.formGroup.get('comuna').disable();
      }
   }

   hoursRange(group: FormGroup) { // here we have the 'passwords' group
      let retiroHourIni: string = group.controls.horaDesde.value;
      retiroHourIni = retiroHourIni.replace(/:/g, '');
      const hourIni = parseInt(retiroHourIni);

      let retiroHourEnd: string = group.controls.horaHasta.value;
      retiroHourEnd = retiroHourEnd.replace(/:/g, '');
      const hourEnd = parseInt(retiroHourEnd);

      return hourIni < hourEnd ? null : { badRange: true }
   }


   comunaListFilter(region: string) {
      const index = this.regionList.findIndex(item => {
         return item.name === region;
      });
      if (index !== -1) {
         this.comunaList = this.regionList[index].comunas;
         this.formGroup.get('comuna').enable();
      }
   }

   submitClicked() {
      if (this.formGroup.valid) {
         this.data.contact = this.formGroup.value.contact;
         this.data.contactPhone = this.formGroup.value.contactPhone;
         this.data.date = this.formGroup.value.date;
         this.data.horaHasta = this.formGroup.value.horaHasta;
         this.data.horaDesde = this.formGroup.value.horaDesde;
         this.data.rut = this.formGroup.value.rut;
         this.data.comuna = this.formGroup.value.comuna;
         this.data.region = this.formGroup.value.region;
         this.data.address = this.formGroup.value.address;
         this.data.zip = this.formGroup.value.zip;

         this.accept.emit(this.data);
      } else {
         this.wasSubmitted = true;
         this.translate.get('ERROR_MESSAGE').subscribe((res: string) => {
            this.toastr.error(res);
         });
         console.log('error');
      }
   }

}


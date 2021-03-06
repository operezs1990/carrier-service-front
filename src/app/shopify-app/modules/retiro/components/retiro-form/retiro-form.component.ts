import { Component, OnInit, OnDestroy, Input, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ErrorHandlingService } from 'app/error-handling/services/error-handling.service';
import 'rxjs/Rx';
import { Region } from 'app/shopify-app/models/region';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
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
import { Admited } from 'app/shopify-app/models/admited';
import { numberValidator } from 'app/validation/helpers/number-validator';
import { alphanumericValidator } from 'app/validation/helpers/alphanumeric-validator';
import { RutValidator } from 'ng2-rut';



declare var $: any;




const errorKey = 'Error';

@Component({
   selector: 'app-retiro-form',
   templateUrl: './retiro-form.component.html',
   styleUrls: ['./retiro-form.component.scss']
})
export class RetiroFormComponent implements OnInit, OnDestroy {

   // sorting
   key = 'name'; // set default
   reverse = false;
   p = 1;

   wasSubmitted = false;

   @Input() regionList: Array<Region>;

   comunaList: Array<Comuna> = [];

   comunaSelectEnable = false;

   public formGroup: FormGroup;

   @Output() cancel = new EventEmitter();

   @Input() data: Retiro;

   @Input() orders: Array<Admited>;

   @Output() accept = new EventEmitter<Retiro>();

   regionValueChanges: Subscription;

   checkboxes: any;

   ordersToRetiro: Array<string> = [];


   constructor(public translateService: TranslateService,
      public activatedRoute: ActivatedRoute,
      private toastr: ToastrService,
      public router: Router,
      private fb: FormBuilder,
      public translate: TranslateService,
      public rutValidator: RutValidator
   ) { }

   ngOnInit() {
      this.regionList.sort(function (a, b) {
         return ((a.name < b.name) ? -1 : ((a.name > b.name) ? 1 : 0));
       });
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

      const phoneControl = new FormControl(this.data.contactPhone, [
         Validators.pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[\s\/0-9]*$/), Validators.required
       ]);
      this.formGroup = this.fb.group({
         contact: [this.data.contact, Validators.compose([Validators.required, alphanumericValidator])],
         contactPhone: phoneControl,
         date: ['', Validators.compose([Validators.required, retiroDate, retiroDateRange])],
         horaDesde: ['', Validators.compose([Validators.required, retiroHourIni])],
         horaHasta: ['', Validators.compose([Validators.required, retiroHourEnd])],

         rut: [this.data.rut, [Validators.required, this.rutValidator]],

         address: [this.data.address, Validators.compose([Validators.required])],
         comuna: [this.data.comuna.toUpperCase(), Validators.compose([Validators.required])],
         region: [this.data.region, Validators.compose([Validators.required])],
         zip: [this.data.zip, Validators.compose([Validators.required, numberValidator])],
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
         this.comunaList.sort(function (a, b) {
            return ((a.name < b.name) ? -1 : ((a.name > b.name) ? 1 : 0));
          });
         this.formGroup.get('comuna').enable();
      }
   }

   submitClicked() {
      this.getCheckboxesOrders()
      if (this.formGroup.valid && this.ordersToRetiro.length > 0) {
         this.data = this.formGroup.value;
         this.data.orderIds = this.ordersToRetiro;
         this.accept.emit(this.data);
      } else {
         this.wasSubmitted = true;
         this.translate.get('ERROR_MESSAGE').subscribe((res: string) => {
            this.toastr.error(res);
         });
         console.log('error');
      }
   }

   getCheckboxesOrders() {
      this.checkboxes = document.getElementsByName('checkboxes');
      for (let i = 0, n = this.checkboxes.length; i < n; i++) {
         if (this.checkboxes[i].checked) {
            this.ordersToRetiro.push(this.orders[i].id);
         }
      }
   }

   getService(code: string): string {
      return (code === '07') ? 'PES' : 'PED';
   }


   selectAll(source) {
      this.checkboxes = document.getElementsByName('checkboxes');
      for (let i = 0, n = this.checkboxes.length; i < n; i++) {
         this.checkboxes[i].checked = source.target.checked;
      }
   }

}


import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Comuna } from 'app/shopify-app/models/comuna';
import { Region } from 'app/shopify-app/models/region';
import { CustomValidators } from 'ng2-validation';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../../../models/user';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { LabelFormat, LABELFORMAT } from 'app/shopify-app/models/label-format';
import { numberValidator } from 'app/validation/helpers/number-validator';
import { alphanumericValidator } from 'app/validation/helpers/alphanumeric-validator';
import { RutValidator } from 'ng2-rut';

declare var $: any;

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit, OnDestroy {

  wasSubmitted = false;

  @Input() regionList: Array<Region>;

  comunaList: Array<Comuna> = [];

  comunaSelectEnable = false;

  public formGroup: FormGroup;

  @Input() data: User;

  @Output() accept = new EventEmitter<User>();

  regionValueChanges: Subscription;

  labelFormatList: LabelFormat[] = LABELFORMAT;



  constructor(public translateService: TranslateService,
    public activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    public router: Router,
    public rutValidator: RutValidator,
    private fb: FormBuilder,
    public translate: TranslateService
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

    const phoneControl = new FormControl(this.data.phone, [
      Validators.pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[\s\/0-9]*$/), Validators.required
    ]);
    this.formGroup = this.fb.group({
      firstName: [this.data.firstName, Validators.compose([Validators.required, alphanumericValidator])],
      lastName: [this.data.lastName, Validators.compose([alphanumericValidator])],
      rut: [this.data.rut, [Validators.required, this.rutValidator]],
      phone: phoneControl,
      email: [this.data.email, Validators.compose([Validators.required, Validators.email])],

      region: [this.data.region, Validators.compose([Validators.required])],
      comuna: [this.data.comuna ? this.data.comuna.toUpperCase() : '', Validators.compose([Validators.required])],
      address: [this.data.address, Validators.compose([Validators.required, Validators.maxLength(30)])],
      zip: [this.data.zip, Validators.compose([Validators.required, numberValidator])],

      userApiChile: [this.data.userApiChile, Validators.compose([Validators.required, alphanumericValidator])],
      passwordApiChile: [this.data.passwordApiChile, Validators.compose([Validators.required])],
      idApiChile: [this.data.idApiChile, Validators.compose([Validators.required, alphanumericValidator])],

      labelFormat: [this.data.labelFormat ? this.data.labelFormat : 'pdf', Validators.compose([Validators.required])],
      recharge: [this.data.recharge ? this.data.recharge : 0],

      shopUrl: [this.data.shopUrl],
    });
    if (!this.data.region) {
      this.formGroup.get('comuna').disable();
    }
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
    if (this.formGroup.valid) {
      this.data.firstName = this.formGroup.value.firstName;
      this.data.lastName = this.formGroup.value.lastName;
      this.data.rut = this.formGroup.value.rut.toString();
      this.data.phone = this.formGroup.value.phone.toString();
      this.data.email = this.formGroup.value.email;
      this.data.comuna = this.formGroup.value.comuna;
      this.data.region = this.formGroup.value.region;
      this.data.address = this.formGroup.value.address;
      this.data.zip = this.formGroup.value.zip.toString();
      this.data.userApiChile = this.formGroup.value.userApiChile;
      this.data.passwordApiChile = this.formGroup.value.passwordApiChile;
      this.data.idApiChile = this.formGroup.value.idApiChile.toString();
      this.data.shopUrl = this.formGroup.value.shopUrl;
      this.data.labelFormat = this.formGroup.value.labelFormat;
      this.data.recharge = this.formGroup.value.recharge;

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


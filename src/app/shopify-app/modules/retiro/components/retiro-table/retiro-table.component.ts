import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DateRange } from '@uiowa/date-range-picker';
import { ConfirmDialogService } from 'app/confirm-dialog/services/confirm-dialog.service';
import { HandledError } from 'app/error-handling/models/handled-error';
import { ErrorHandlingService } from 'app/error-handling/services/error-handling.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { RetiroService } from '../../services/retiro.service';
import { Retiro } from 'app/shopify-app/models/retiro';
import { Admited } from 'app/shopify-app/models/admited';
import { AdmitedService } from 'app/shopify-app/modules/admited/services/orders.service';



const errorKey = 'Error';

declare var $: any;
@Component({
  selector: 'app-retiro-table',
  templateUrl: './retiro-table.component.html',
  styleUrls: ['./retiro-table.component.scss']
})
export class RetiroTableComponent implements OnInit, AfterViewInit, OnDestroy {


   // sorting
   key = 'name'; // set default
   reverse = false;
   p = 1;

  dateRange = new DateRange(new Date(''), new Date(''));

  checkboxes: any;
  date: Date;
  filter: FormGroup;

  filterValueChanges: Subscription;

  retirosList: Array<Retiro>;

  retiros: Array<Retiro>;

  orders: Array<Admited> = [];

  constructor(private confirmDialogService: ConfirmDialogService,
    public retiroService: RetiroService,
    public errorHandlingService: ErrorHandlingService,
    public translate: TranslateService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public admitedService: AdmitedService,
    private toastr: ToastrService) {
  }


  ngOnInit() {
    this.filter = this.createFilterFormGroup();
    this.getOrders();
    this.filterValueChanges = this.filter.valueChanges.pipe(debounceTime(500))
      .subscribe(change => this.onFilter());
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();

  }

  getOrders() {
    this.admitedService.getAdmiteds()
      .subscribe((response: Admited[]) => {
        this.orders = response;
      },
        (err: HandledError) => {
          this.errorHandlingService.handleUiError(errorKey, err);
        });
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  ngAfterViewInit() {
    this.loadPage();
  }

  ngOnDestroy() {
    this.filterValueChanges.unsubscribe();
  }

  createFilterFormGroup() {
    const group: any = {};
    group['rangeDate'] = new FormControl('');
    group['name'] = new FormControl('');
    return new FormGroup(group);
  }

  loadPage() {
    this.getRetiros();
  }

  getRetiros() {
    this.retiroService.getRetiros(
      Object.assign({}, this.filter.value))
      .subscribe((response: Retiro[]) => {
        this.retiros = response;
      },
        (err: HandledError) => {
          this.errorHandlingService.handleUiError(errorKey, err);
        });
  }

  getDateUTC(date: any): string {
    const t: Date = new Date(date);
    const dateUtc: string = `${t.getUTCDate()}` + '/' + `${t.getUTCMonth() + 1}` + '/' + `${t.getUTCFullYear()}`;
    return dateUtc;
  }

  onFilter() {
    this.loadPage();
  }

  onSort() {
    this.loadPage();
  }

  onPage() {
    this.loadPage();
  }

  onDetails(id: number) {
    this.router.navigate(['/carrier/retiro/details', id]);
  }

  onCreate() {
    if (this.orders.length === 0) {
      this.translate.get('No hay órdenes pendiente por retiro').subscribe((res: string) => {
         this.toastr.error(res);
      });
    } else {
      this.router.navigate(['/carrier/retiro/create']);
    }

  }

  generateManifest(id: string) {
   this.router.navigate(['/carrier/manifest', id]);
  }

  onDelete(index: number) {
  }

  clearDate() {
    this.dateRange = new DateRange(new Date(''), new Date(''));
    this.filter.value.rangeDate = false;
    this.loadPage();

  }

  filterDate() {
    if (this.dateRange.end.toDateString() !== 'Invalid Date') {
      this.filter.value.rangeDate = this.dateRange;
      this.loadPage();
    }

  }



}

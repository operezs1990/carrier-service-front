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
import { OrdersService } from '../../services/orders.service';
import { Order } from 'app/shopify-app/models/order';
import { Retiro } from 'app/shopify-app/models/retiro';
import { RetiroService } from 'app/shopify-app/modules/retiro/services/retiro.service';
import { Admited } from 'app/shopify-app/models/admited';


const errorKey = 'Error';

declare var $: any;
@Component({
  selector: 'app-archives-table',
  templateUrl: './archives-table.component.html',
  styleUrls: ['./archives-table.component.scss']
})
export class ArchivesTableComponent implements OnInit, AfterViewInit, OnDestroy {

  // sorting
  key = 'name'; // set default
  reverse = false;
  p = 1;

  dateRange = new DateRange(new Date(''), new Date(''));

  filter: FormGroup;

  rowsNumber = 1000;

  filterValueChanges: Subscription;

  retiros: Array<Retiro>;

  orders: Array<Admited> = [];

  retiroMap = new Map();



  constructor(private confirmDialogService: ConfirmDialogService,
    public errorHandlingService: ErrorHandlingService,
    public translate: TranslateService,
    public router: Router,
    public retiroService: RetiroService,
    public activatedRoute: ActivatedRoute,
    private toastr: ToastrService) {
  }

  ngOnInit() {
    this.filter = this.createFilterFormGroup();

    this.filterValueChanges = this.filter.valueChanges.pipe(debounceTime(500))
      .subscribe(change => this.onFilter());
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();

  }

  ngAfterViewInit() {
    this.loadPage();
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  ngOnDestroy() {
    this.filterValueChanges.unsubscribe();
  }

  createFilterFormGroup() {
    const group: any = {};
    group['rowsNumber'] = new FormControl(this.rowsNumber);
    group['rangeDate'] = new FormControl('');
    group['name'] = new FormControl('');
    return new FormGroup(group);
  }

  loadPage() {
    this.rowsNumber = this.filter.value.rowsNumber;
    this.getRetiros();
  }

  getRetiros() {
    this.retiroService.getRetiros(
      Object.assign({}, this.filter.value))
      .subscribe((response: Retiro[]) => {
        this.retiros = response;
        this.getOrderRetired();
      },
        (err: HandledError) => {
          this.errorHandlingService.handleUiError(errorKey, err);
        });
  }

  getOrderRetired() {
    this.retiros.forEach((retiro, index) => {
      this.orders = this.orders.concat(retiro.orders);
      retiro.orders.forEach(order => {
        this.retiroMap.set(order.id, index);
      })
    });
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

  onDetails(index: number) {
  }

  onEdit(index: number) {
  }


  onDelete(index: number) {
  }


  filterDate() {
    if (this.dateRange.end.toDateString() !== 'Invalid Date') {
      this.filter.value.rangeDate = this.dateRange;
      this.loadPage();
    }

  }


}

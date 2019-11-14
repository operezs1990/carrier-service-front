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


const errorKey = 'Error';

declare var $: any;
@Component({
  selector: 'app-archives-table',
  templateUrl: './archives-table.component.html',
  styleUrls: ['./archives-table.component.scss']
})
export class ArchivesTableComponent implements OnInit, AfterViewInit, OnDestroy {

  dateRange = new DateRange(new Date(''), new Date(''));

  checkboxes: any;
  date: Date;
  filter: FormGroup;
  rowsNumber = 1000;

  filterValueChanges: Subscription;

  ordersList: Array<Order> = [];

  orders: Array<Order>;



  constructor(private confirmDialogService: ConfirmDialogService,
    public ordersService: OrdersService,
    public errorHandlingService: ErrorHandlingService,
    public translate: TranslateService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    private toastr: ToastrService) {
  }

  ngOnInit() {
    // this.getStaticOrders();

    this.filter = this.createFilterFormGroup();

    this.filterValueChanges = this.filter.valueChanges.pipe(debounceTime(500))
      .subscribe(change => this.onFilter());
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();

  }

  ngAfterViewInit() {
    // this.loadPage();
  }

  ngOnDestroy() {
    this.filterValueChanges.unsubscribe();
  }

  createFilterFormGroup() {
    const group: any = {};
    group['rowsNumber'] = new FormControl(this.rowsNumber);
    group['rangeDate'] = new FormControl('');
    group['name'] = new FormControl('');
    group['size'] = new FormControl('');
    group['sector'] = new FormControl('');
    return new FormGroup(group);
  }

  loadPage() {
    this.rowsNumber = this.filter.value.rowsNumber;
    this.getOrders();
  }

  getOrders() {
    this.ordersService.getOrders(
      Object.assign({}, this.filter.value))
      .subscribe((response: Order[]) => {
        this.orders = response;
      },
        (err: HandledError) => {
          this.errorHandlingService.handleUiError(errorKey, err);
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
    // const id = this.companies[index].id;
    // this.router.navigate(['/company/details', id]);
  }

  onEdit(index: number) {
    // const id = this.companies[index].id;
    // this.router.navigate(['/company/edit', id]);
  }

  // onDelete(index: number) {
  // 	const id = this.companies[index].id;
  // 	this.companyService.deleteCompany(id).subscribe(response => {
  // 		this.translate.get('DELETE_MESSAGE').subscribe((res: string) => {
  // 			this.toastr.success(res);
  // 		});
  // 		this.loadPage();
  // 	});
  // }

  deleteCompany(index: number) {
    // const id = this.companies[index].id;
    // this.companyService.deleteCompany(id).subscribe(response => {
    // 	this.translate.get('DELETE_MESSAGE').subscribe((res: string) => {
    // 		this.toastr.success(res);
    // 	});
    // 	this.loadPage();
    // }, (error: HandledError) => {
    // 	this.errorHandlingService.handleUiError(errorKey, error, 'regions');
    // });
  }

  onDelete(index: number) {
    let confirm: string;
    let message: string;
    this.translate.get('CONFIRM_TEXT').subscribe((res: string) => {
      confirm = res;
    });
    this.translate.get('CONFIRM_DELETE_COMPANY_MESSAGE').subscribe((res: string) => {
      message = res;
    });
    this.confirmDialogService.confirm(confirm, message)
      .then((confirmed) => {
        if (confirmed) {
          this.deleteCompany(index);
        }
      })
      .catch(() => {
        console.log('User dismissed the dialog')
      });
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

  getStaticOrders() {
    this.ordersService.getStaticOrders().subscribe(res => {
      this.ordersList = res;
    },
      err => console.log(err),
      () => this.ordersList
    );
  }

}

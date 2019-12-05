import { AfterViewInit, Component, OnDestroy, OnInit, Input } from '@angular/core';
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
import { AdmitedService } from '../../services/orders.service';
import { Order } from 'app/shopify-app/models/order';
import { Admited } from 'app/shopify-app/models/admited';
import { Retiro } from 'app/shopify-app/models/retiro';
import { UserService } from 'app/shopify-app/modules/user/services/user.service';
import { AuthService } from 'app/authentication/services/auth.service';
import { User } from 'app/shopify-app/models/user';


const errorKey = 'Error';

declare var $: any;
@Component({
  selector: 'app-admited-table',
  templateUrl: './admited-table.component.html',
  styleUrls: ['./admited-table.component.scss']
})
export class AdmitedTableComponent implements OnInit, AfterViewInit, OnDestroy {

  // sorting
  key = 'name'; // set default
  reverse = false;
  p = 1;

  dateRange = new DateRange(new Date(''), new Date(''));

  checkboxes: any;
  date: Date;
  filter: FormGroup;
  rowsNumber = 1000;

  filterValueChanges: Subscription;

  ordersList: Array<Order> = [];

  orders: Array<Admited> = [];

  @Input() retiro: Retiro;

  user: User;
  userId: string;


  constructor(private confirmDialogService: ConfirmDialogService,
    public admitedService: AdmitedService,
    public errorHandlingService: ErrorHandlingService,
    public translate: TranslateService,
    public router: Router,
    public authService: AuthService,
    public userService: UserService,
    public activatedRoute: ActivatedRoute,
    private toastr: ToastrService) {
  }

  ngOnInit() {
    // this.getStaticOrders();
    this.userId = this.authService.currentUser.id;
    this.filter = this.createFilterFormGroup();

    this.filterValueChanges = this.filter.valueChanges.pipe(debounceTime(500))
      .subscribe(change => this.onFilter());
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();
    this.getUser();

  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  getUser() {
    this.userService.getUser(this.userId).subscribe(response => {
      this.user = response;
    },
      (error: HandledError) => this.errorHandlingService.handleUiError(errorKey, error)
    );
  }

  ngAfterViewInit() {
    this.rowsNumber = this.filter.value.rowsNumber;
    if (!this.retiro) {
      this.loadPage();
    }
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
    this.getOrders();
  }

  getOrders() {
    this.admitedService.getAdmiteds(
      Object.assign({}, this.filter.value))
      .subscribe((response: Admited[]) => {
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
  }

  generateLabel(order: Admited) {
    this.admitedService.getLabel(order, this.user.labelFormat);
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

  getService(code: string): string {
    return (code === '07') ? 'PES' : 'PED';
  }

  getStaticOrders() {
    this.admitedService.getStaticOrders().subscribe(res => {
      this.ordersList = res;
    },
      err => console.log(err),
      () => this.ordersList
    );
  }

  

}

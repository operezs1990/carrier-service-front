import { AfterViewInit, Component, OnDestroy, OnInit, Input } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
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
import { Ids } from 'app/shopify-app/models/ids';


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
  ordersToAdmission: Ids = { ids: [] };

  @Input() retiro: Retiro;

  user: User;
  userId: string;

  actions = [
    {
      id: 'admission',
      name: 'Generar Admisión',
    },
  ]


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
    this.rowsNumber = 10;
    if (!this.retiro) {
      this.loadPage();
    }
  }

  ngOnDestroy() {
    this.filterValueChanges.unsubscribe();
  }

  createFilterFormGroup() {
    const group: any = {};
    group['status'] = new FormControl('');
    return new FormGroup(group);
  }

  onAdmission(orderId: string) {
    this.admitedService.postAdmission(orderId).subscribe(response => {
      this.toastr.success('Se completó la Admisión de forma correcta');
      this.loadPage();
    },
      (err: HandledError) => {
        this.toastr.error('No se pudo completar la Admisión, nos encontramos en trabajos de mantenimiento en los servicios de correos de chile, intentelo más tarde. Gracias!!!');
        this.errorHandlingService.handleUiError(errorKey, err);
      });
  }

  loadPage() {
    this.getOrders();
  }

  getOrders() {
    this.admitedService.getAdmiteds(
      Object.assign({}, this.filter.value))
      .subscribe((response: Admited[]) => {
        this.orders = response;
        // this.detectErrors();
      },
        (err: HandledError) => {
          this.errorHandlingService.handleUiError(errorKey, err);
        });
  }

  getStatus(status): string {
    if (status === 'voided') {
      return 'Cancelado';
    } else if (status === 'pending') {
      return 'Pendiente';
    } else if (status === 'paid') {
      return 'Pagado';
    } else if (status === 'authorized') {
      return 'Autorizado';
    } else {
      return '';
    }
  }

  detectErrors() {
    this.orders.forEach((order: Admited) => {
      if (!order.admission) {
        this.toastr.error('Encontramos Órdenes que no fueron admitidas correctamente, lo más probable es que se generaron por trabajos de mantenimiento en los servicios de correos de chile, por favor regenere la admisión de forma manual para las Órdenes marcadas en rojo. Gracias!!!');
        return;
      }
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


  onDelete(id: string) {
    this.confirmDialogService.confirm('Eliminar orden', 'Seguro que desea eliminar la orden?')
      .then((confirmed) => {
        if (confirmed) {
          this.admitedService.deleteOrder(id).subscribe(() => {
            this.toastr.success('Orden eliminada con éxito');
            this.loadPage();
          }, error => this.errorHandlingService.handleUiError(errorKey, error));
        }
      })
      .catch(() => {
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

  selectAll(source) {
    this.checkboxes = document.getElementsByName('checkboxes');
    for (let i = 0, n = this.checkboxes.length; i < n; i++) {
      this.checkboxes[i].checked = source.target.checked;
    }
  }

  getCheckboxesOrders() {
    this.checkboxes = document.getElementsByName('checkboxes');
    for (let i = 0, n = this.checkboxes.length; i < n; i++) {
      if (this.checkboxes[i].checked) {
        this.ordersToAdmission.ids.push(this.orders[i].id);
      }
    }
  }

  generateBulkAdmissions() {
    this.getCheckboxesOrders()
    if (this.ordersToAdmission.ids.length > 0) {
      this.admitedService.postBulkAdmission(this.ordersToAdmission).subscribe(response => {
        this.toastr.success('Se completó la acción de forma correcta');
        this.loadPage();
      },
        (err: HandledError) => {
          this.toastr.error('No se pudo completar la acción!');
          this.errorHandlingService.handleUiError(errorKey, err);
        });
    } else {
      this.toastr.error('Selexione al menos una órden');
      console.log('error');
    }
  }

}

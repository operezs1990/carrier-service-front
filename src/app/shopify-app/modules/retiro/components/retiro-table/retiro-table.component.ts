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



const errorKey = 'Error';

declare var $: any;
@Component({
  selector: 'app-retiro-table',
  templateUrl: './retiro-table.component.html',
  styleUrls: ['./retiro-table.component.scss']
})
export class RetiroTableComponent implements OnInit, AfterViewInit, OnDestroy {

  dateRange = new DateRange(new Date(''), new Date(''));

  checkboxes: any;
  date: Date;
  filter: FormGroup;

  filterValueChanges: Subscription;

  retirosList: Array<Retiro>;

  retiros: Array<Retiro>;

  constructor(private confirmDialogService: ConfirmDialogService,
    public retiroService: RetiroService,
    public errorHandlingService: ErrorHandlingService,
    public translate: TranslateService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    private toastr: ToastrService) {
  }


  ngOnInit() {
    this.getStaticRetiros();

    this.filter = this.createFilterFormGroup();

    this.filterValueChanges = this.filter.valueChanges.pipe(debounceTime(500))
      .subscribe(change => this.onFilter());
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();
  }

  getStaticRetiros() {
    this.retiroService.getStaticRetiros().subscribe(res => {
      this.retirosList = res;
    },
      err => console.log(err),
      () => this.retirosList
    );
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

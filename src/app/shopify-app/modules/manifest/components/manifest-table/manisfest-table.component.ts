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
import { Manifest } from 'app/shopify-app/models/manifest';
import { ManifestService } from '../../services/manifest.service';
import { ManifestRecord } from 'app/shopify-app/models/manifest-rows';


const errorKey = 'Error';

declare var $: any;
@Component({
  selector: 'app-manifest-table',
  templateUrl: './manifest-table.component.html',
  styleUrls: ['./manifest-table.component.scss']
})
export class ManifestTableComponent implements OnInit, AfterViewInit, OnDestroy {

  dateRange = new DateRange(new Date(''), new Date(''));

  checkboxes: any;
  date: Date;
  filter: FormGroup;
  rowsNumber = 1000;

  filterValueChanges: Subscription;

  manifest: Array<ManifestRecord>;

  manifestList: Array<ManifestRecord>;

  sizeList: Array<any> = [];

  sectorList: Array<any> = [];


  constructor(private confirmDialogService: ConfirmDialogService,
    public manifestService: ManifestService,
    public errorHandlingService: ErrorHandlingService,
    public translate: TranslateService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    private toastr: ToastrService) {
  }

  ngOnInit() {
    this.getStaticManifestRecords();

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
    this.getManifestRecords();
  }

  getManifestRecords() {
    this.manifestService.getManifestRecords(
      Object.assign({}, this.filter.value))
      .subscribe((response: ManifestRecord[]) => {
        this.manifest = response;
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

  getStaticManifestRecords() {
    this.manifestService.getStaticManifestRecords().subscribe(res => {
      this.manifestList = res;
    },
      err => console.log(err),
      () => this.manifestList
    );
  }

}

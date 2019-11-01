import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ErrorHandlingService } from 'app/error-handling/services/error-handling.service';
import 'rxjs/Rx';
import { PageTitleService } from '../../../../../core/page-title/page-title.service';
import { DataConfigService } from '../../services/data-config.service';

declare var $: any;




const errorKey = 'Error';

@Component({
   selector: 'app-data-config',
   templateUrl: './data-config.component.html',
   styleUrls: ['./data-config.component.scss']
})
export class DataConfigComponent implements OnInit {

   constructor(private pageTitleService: PageTitleService,
      public activatedRoute: ActivatedRoute,
      public translate: TranslateService,
      public router: Router,
      private errorHandlingService: ErrorHandlingService,
      public dataConfigService: DataConfigService,
      private http: HttpClient) { }

   ngOnInit() {
   }


   onEditPedido() {
      // this.router.navigate(['/company/edit', this.companyId]);
   }


}

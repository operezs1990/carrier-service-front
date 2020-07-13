import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/Rx';
import { Retiro } from 'app/shopify-app/models/retiro';
import { ErrorHandlingService } from 'app/error-handling/services/error-handling.service';
import { HandledError } from 'app/error-handling/models/handled-error';
import { RetiroService } from '../../services/retiro.service';

declare var $: any;



const errorKey = 'Error';

@Component({
   selector: 'app-retiro-details',
   templateUrl: './retiro-details.component.html',
   styleUrls: ['./retiro-details.component.scss']
})
export class RetiroDetailsComponent implements OnInit {

   retiroId: string;

   retiro: Retiro;

   constructor(
      public activatedRoute: ActivatedRoute,
      public translate: TranslateService,
      public router: Router,
      public retiroService: RetiroService,
      private errorHandlingService: ErrorHandlingService) { }

   ngOnInit() {
      this.retiroId = this.activatedRoute.snapshot.data.retiroId;
      this.getRetiro();

   }

   getDateUTC(date: any): string {
      const t: Date = new Date(date);
      const dateUtc: string = `${t.getUTCDate()}` + '/' + `${t.getUTCMonth() + 1}` + '/' + `${t.getUTCFullYear()}`;
      return dateUtc;
    }

   getRetiro() {
      this.retiroService.getRetiro(this.retiroId).subscribe((response: Retiro) => {
         this.retiro = response;
      },
         (err: HandledError) => {
            this.errorHandlingService.handleUiError(errorKey, err);
         });
   }

}

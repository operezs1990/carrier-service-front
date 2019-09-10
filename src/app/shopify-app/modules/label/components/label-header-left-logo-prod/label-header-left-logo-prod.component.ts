import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PesLabel } from 'app/shopify-app/models/pes-label';




const errorKey = 'Error';

declare var $: any;
@Component({
  selector: 'app-label-header-left-logo-prod',
  templateUrl: './label-header-left-logo-prod.component.html',
  styleUrls: ['./label-header-left-logo-prod.component.scss']
})
export class LabelHeaderLeftLogoProdComponent implements OnInit {

  @Input() label: PesLabel;

  constructor(public translate: TranslateService) {
  }

  ngOnInit() {
  }

}

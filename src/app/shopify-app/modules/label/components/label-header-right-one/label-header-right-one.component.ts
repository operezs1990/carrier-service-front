import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PesLabel } from 'app/shopify-app/models/pes-label';




const errorKey = 'Error';

declare var $: any;
@Component({
  selector: 'app-label-header-right-one',
  templateUrl: './label-header-right-one.component.html',
  styleUrls: ['./label-header-right-one.component.scss']
})
export class LabelHeaderRightOneComponent implements OnInit {

  @Input() label: Array<PesLabel>;

  constructor(public translate: TranslateService) {
  }

  ngOnInit() {
  }

}

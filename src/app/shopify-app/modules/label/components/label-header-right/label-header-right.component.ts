import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PesLabel } from 'app/shopify-app/models/pes-label';




const errorKey = 'Error';

declare var $: any;
@Component({
  selector: 'app-label-header-right',
  templateUrl: './label-header-right.component.html',
  styleUrls: ['./label-header-right.component.scss']
})
export class LabelHeaderRightComponent implements OnInit {

  @Input() label: PesLabel;

  constructor(public translate: TranslateService) {
  }

  ngOnInit() {
  }

}

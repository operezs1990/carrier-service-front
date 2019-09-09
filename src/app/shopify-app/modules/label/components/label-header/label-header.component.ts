import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PesLabel } from 'app/shopify-app/models/pes-label';




const errorKey = 'Error';

declare var $: any;
@Component({
  selector: 'app-label-header',
  templateUrl: './label-header.component.html',
  styleUrls: ['./label-header.component.scss']
})
export class LabelHeaderComponent implements OnInit {

  @Input() label: Array<PesLabel>;
  
  constructor(public translate: TranslateService) {
  }

  ngOnInit() {
  }

}

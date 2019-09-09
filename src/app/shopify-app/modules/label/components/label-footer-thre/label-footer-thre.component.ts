import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LabeltService } from '../../services/label.service';
import { PesLabel } from 'app/shopify-app/models/pes-label';


const errorKey = 'Error';

declare var $: any;
@Component({
  selector: 'app-label-footer-thre',
  templateUrl: './label-footer-thre.component.html',
  styleUrls: ['./label-footer-thre.component.scss']
})
export class LabelFooterThreComponent implements OnInit {

  @Input() label: Array<PesLabel>;

  constructor(public labelService: LabeltService,
              public translate: TranslateService) {
  }

  ngOnInit() {

  }


}

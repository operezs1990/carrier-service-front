import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PesLabel } from 'app/shopify-app/models/pes-label';
import { LabeltService } from '../../services/label.service';


const errorKey = 'Error';

declare var $: any;
@Component({
  selector: 'app-label-footer-two',
  templateUrl: './label-footer-two.component.html',
  styleUrls: ['./label-footer-two.component.scss']
})
export class LabelFooterTwoComponent implements OnInit {

  @Input() label: PesLabel;

  constructor(public labelService: LabeltService,
              public translate: TranslateService) {
  }

  ngOnInit() {

  }


}

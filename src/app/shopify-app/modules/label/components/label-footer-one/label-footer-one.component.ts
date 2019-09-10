import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LabeltService } from '../../services/label.service';
import { PesLabel } from 'app/shopify-app/models/pes-label';


const errorKey = 'Error';

declare var $: any;
@Component({
  selector: 'app-label-footer-one',
  templateUrl: './label-footer-one.component.html',
  styleUrls: ['./label-footer-one.component.scss']
})
export class LabelFooterOneComponent implements OnInit {

  @Input() label: PesLabel;

  constructor(public labelService: LabeltService,
              public translate: TranslateService) {
  }

  ngOnInit() {

  }


}

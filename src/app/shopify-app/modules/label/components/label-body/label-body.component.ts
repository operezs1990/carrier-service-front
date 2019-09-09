import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PesLabel } from 'app/shopify-app/models/pes-label';
import { LabeltService } from '../../services/label.service';


const errorKey = 'Error';

declare var $: any;
@Component({
  selector: 'app-label-body',
  templateUrl: './label-body.component.html',
  styleUrls: ['./label-body.component.scss']
})
export class LabelBodyComponent implements OnInit {

  @Input() label: Array<PesLabel>;

  constructor(public labelService: LabeltService,
              public translate: TranslateService) {
  }

  ngOnInit() {
  }

}

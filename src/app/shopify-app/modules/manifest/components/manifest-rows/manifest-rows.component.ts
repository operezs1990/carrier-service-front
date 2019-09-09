import { Component, OnInit, Input } from '@angular/core';
import { Manifest } from 'app/shopify-app/models/manifest';



const errorKey = 'Error';

declare var $: any;
@Component({
  selector: 'app-manifest-rows',
  templateUrl: './manifest-rows.component.html',
  styleUrls: ['./manifest-rows.component.scss']
})
export class ManifestRowsComponent implements OnInit {

  @Input() manifestList: Array<Manifest>;

  arrayTemp: any[] = [];

  constructor() {
  }

  ngOnInit() {
    if (this.manifestList.length < 16) {
      for (let i = this.manifestList.length; i < 16; i++) {
        this.arrayTemp.push('i');
      }
    }
  }
}

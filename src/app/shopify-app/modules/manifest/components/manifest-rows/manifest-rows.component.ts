import { Component, OnInit, Input } from '@angular/core';
import { Manifest } from 'app/shopify-app/models/manifest';
import { Retiro } from 'app/shopify-app/models/retiro';



const errorKey = 'Error';

declare var $: any;
@Component({
  selector: 'app-manifest-rows',
  templateUrl: './manifest-rows.component.html',
  styleUrls: ['./manifest-rows.component.scss']
})
export class ManifestRowsComponent implements OnInit {

  @Input() retiro: Retiro;

  arrayTemp: any[] = [];

  constructor() {
  }

  ngOnInit() {
    if (this.retiro.orders.length < 16) {
      for (let i = this.retiro.orders.length; i < 16; i++) {
        this.arrayTemp.push('i');
      }
    }
  }
}

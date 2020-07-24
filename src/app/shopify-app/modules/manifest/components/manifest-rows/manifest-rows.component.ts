import { Component, OnInit, Input } from '@angular/core';
import { Manifest } from 'app/shopify-app/models/manifest';
import { Retiro } from 'app/shopify-app/models/retiro';
import { Admited } from 'app/shopify-app/models/admited';



const errorKey = 'Error';

declare var $: any;
@Component({
  selector: 'app-manifest-rows',
  templateUrl: './manifest-rows.component.html',
  styleUrls: ['./manifest-rows.component.scss']
})
export class ManifestRowsComponent implements OnInit {

  @Input() retiro: Retiro;

  constructor() {
  }

  ngOnInit() {
  }

  getService(code: string): string {
    return (code === '07') ? 'PAQUETE EXPRES SUCURSAL' : 'PAQUETE EXPRES DOMICILIO';
  }

  getBarCodeNumber(order: Admited) {
    return `${order.admission.codigoEncaminamiento}${order.admission.numeroEnvio}001`;
  }

}

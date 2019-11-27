import { Component, OnInit, Input } from '@angular/core';
import { Retiro } from 'app/shopify-app/models/retiro';
import { User } from 'app/shopify-app/models/user';



const errorKey = 'Error';

declare var $: any;
@Component({
  selector: 'app-manifest-header',
  templateUrl: './manifest-header.component.html',
  styleUrls: ['./manifest-header.component.scss']
})
export class ManifestHeaderComponent implements OnInit {
  @Input() retiro: Retiro;
  @Input() user: User;

  date = new Date();

  day: string;
  mount: string;
  year: string;

  manifestNumber: string;

  constructor() {
  }

  ngOnInit() {
  let year = this.date.getFullYear().toString();
  this.manifestNumber = `${year.substr(year.length - 2)}` + `${this.date.getMonth() + 1}` + `${this.date.getDate()}`
                          + `${this.user.idApiChile}` + `${123}`;
  }

}

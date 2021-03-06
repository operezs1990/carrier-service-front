import { Injectable } from '@angular/core';

export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
  label?: string;
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  label?: string;
  children?: ChildrenItems[];
}

const MENUITEMS = [

   // {
   //    state: 'information',
   //    name: 'POST INFORMATION',
   //    type: 'link',
   //    icon: 'fa fa-bank icons',
   // },
   // {
   //    state: 'orders',
   //    name: 'Pedidos',
   //    type: 'link',
   //    icon: 'fa fa-shopping-bag icons',
   // },
   {
      state: 'admited',
      name: 'Pedidos',
      type: 'link',
      icon: 'fa fa-calendar-check-o icons',
   },
   {
      state: 'retiro',
      name: 'Retiro',
      type: 'link',
      icon: 'fa fa-registered icons',
   },
   {
      state: 'archives',
      name: 'Archivos',
      type: 'link',
      icon: 'fa fa-archive icons',
   },
   // {
   //    state: '',
   //    name: 'Backoffice',
   //    type: 'external_link',
   //    icon: 'fa fa-cogs icons',
   // },
/*    {
      state: 'session',
      name: 'SESSIONS',
      type: 'sub',
      icon: 'icon-login icons',
      label: 'New',
      children: [
      {state: 'loginone', name: 'LOGIN'},
      {state: 'register', name: 'REGISTER'},
      {state: 'forgot-password', name: 'FORGOT'},
      {state: 'coming-soon', name: 'COMING SOON'},
      {state: 'coming-soonV2', name: 'COMING SOON V2', label : 'New'},
      {state: 'undermaintance', name: 'UNDER MAINTENANCE'},
      {state: 'maintanceV2', name: 'MAINTENANCE V2', label : 'New'},
      {state: 'lockscreen', name: 'LOCKSCREEN'},
      {state: 'subscribes', name: 'SUBSCRIBES'},
      {state: 'not-found', name: '404'},
      ]
   } */
];

@Injectable()
export class MenuItems {
   getAll(): Menu[] {
      return MENUITEMS;
   }
   add(menu: any) {
      MENUITEMS.push(menu);
   }
}

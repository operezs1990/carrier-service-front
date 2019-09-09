import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigResolveService } from 'app/config/services/config-resolve.service';
import { IdResolveService } from 'app/routing/services/id-resolve.service';
import { OrdersDetailsComponent } from './components/orders-details/orders-details.component';
import { OrdersTableComponent } from './components/orders-table/orders-table.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'orders',
    pathMatch: 'full',
  },
  {
    path: 'orders',
    component: OrdersTableComponent,
    resolve: {
      config: ConfigResolveService,
    },
  },
  {
    path: 'details/:id',
    component: OrdersDetailsComponent,
    resolve: {
      config: ConfigResolveService,
      pedidoId: IdResolveService,
    },
    data: { closeRouteCommand: ['../'] }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigResolveService } from 'app/config/services/config-resolve.service';
import { IdResolveService } from 'app/routing/services/id-resolve.service';
import { RetiroTableComponent } from './components/retiro-table/retiro-table.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: 'list',
    component: RetiroTableComponent,
    resolve: {
      config: ConfigResolveService,
    },
  },
  // {
  //   path: 'details/:id',
  //   component: OrdersDetailsComponent,
  //   resolve: {
  //     config: ConfigResolveService,
  //     pedidoId: IdResolveService,
  //   },
  //   data: { closeRouteCommand: ['../'] }
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RetiroRoutingModule { }


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigResolveService } from 'app/config/services/config-resolve.service';
import { IdResolveService } from 'app/routing/services/id-resolve.service';
import { AdmitedDetailsComponent } from './components/admited-details/admited-details.component';
import { AdmitedTableComponent } from './components/admited-table/admited-table.component';

const routes: Routes = [
  {
    path: '',
    component: AdmitedTableComponent,
    resolve: {
      config: ConfigResolveService,
    },
  },
  {
    path: 'admited/:id',
    component: AdmitedDetailsComponent,
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
export class AdmitedRoutingModule { }


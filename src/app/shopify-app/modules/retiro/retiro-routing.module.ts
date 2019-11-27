import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigResolveService } from 'app/config/services/config-resolve.service';
import { IdResolveService } from 'app/routing/services/id-resolve.service';
import { RetiroTableComponent } from './components/retiro-table/retiro-table.component';
import { NewRetiroComponent } from './components/new-retiro/new-retiro.component';
import { RetiroDetailsComponent } from './components/retiro-details/retiro-details.component';

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
  {
    path: 'create',
    component: NewRetiroComponent,
    resolve: {
      config: ConfigResolveService,
    },
  },
  {
    path: 'details/:id',
    component: RetiroDetailsComponent,
    resolve: {
      config: ConfigResolveService,
      retiroId: IdResolveService,
    },
    data: { closeRouteCommand: ['../'] }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RetiroRoutingModule { }


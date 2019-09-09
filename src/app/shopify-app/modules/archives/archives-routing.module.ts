import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigResolveService } from 'app/config/services/config-resolve.service';
import { IdResolveService } from 'app/routing/services/id-resolve.service';
import { ArchivesDetailsComponent } from './components/archives-details/archives-details.component';
import { ArchivesTableComponent } from './components/archives-table/archives-table.component';

const routes: Routes = [
  {
    path: '',
    component: ArchivesTableComponent,
    resolve: {
      config: ConfigResolveService,
    },
  },
  {
    path: 'archives/:id',
    component: ArchivesDetailsComponent,
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
export class ArchivesRoutingModule { }


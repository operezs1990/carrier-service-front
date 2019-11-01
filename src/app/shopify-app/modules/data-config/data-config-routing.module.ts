import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigResolveService } from 'app/config/services/config-resolve.service';
import { IdResolveService } from 'app/routing/services/id-resolve.service';
import { DataConfigComponent } from './components/data-config/data-config.component';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'config',
  //   pathMatch: 'full',
  // },
  {
    path: '',
    component: DataConfigComponent,
    resolve: {
      config: ConfigResolveService,
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataConfigRoutingModule { }


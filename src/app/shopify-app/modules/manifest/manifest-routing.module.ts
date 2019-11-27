import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigResolveService } from 'app/config/services/config-resolve.service';
import { ManifestComponent } from './components/manifest/manisfest.component';
import { IdResolveService } from 'app/routing/services/id-resolve.service';


const routes: Routes = [
  {
    path: '',
    component: ManifestComponent,
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
export class ManifestRoutingModule { }


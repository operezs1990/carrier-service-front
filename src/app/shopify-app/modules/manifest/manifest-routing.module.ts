import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigResolveService } from 'app/config/services/config-resolve.service';
import { ManifestTableComponent } from './components/manifest-table/manisfest-table.component';
import { ManifestComponent } from './components/manifest/manisfest.component';


const routes: Routes = [
  {
    path: '',
    component: ManifestTableComponent,
    resolve: {
      config: ConfigResolveService,
    },
  },
  {
    path: 'manifest-doc',
    component: ManifestComponent,
    resolve: {
      config: ConfigResolveService,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManifestRoutingModule { }


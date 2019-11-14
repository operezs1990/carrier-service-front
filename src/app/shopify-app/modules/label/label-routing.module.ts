import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigResolveService } from 'app/config/services/config-resolve.service';
import { LabelComponent } from './components/label/label.component';
import { IdResolveService } from 'app/routing/services/id-resolve.service';



const routes: Routes = [
  {
    path: '',
    component: LabelComponent,
    resolve: {
      config: ConfigResolveService,
      admitedId: IdResolveService,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LabelRoutingModule { }


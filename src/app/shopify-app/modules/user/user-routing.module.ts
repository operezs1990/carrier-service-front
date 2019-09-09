import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { ConfigResolveService } from 'app/config/services/config-resolve.service';

const routes: Routes = [
  {
    path: 'profile',
    component: UserEditComponent,
    resolve: {
      config: ConfigResolveService,
    },
    data: { closeRouteCommand: ['../'] }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UserRoutingModule { }

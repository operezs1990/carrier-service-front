import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfigResolveService } from './config/services/config-resolve.service';
import { AuthGuardService } from './authentication/services/auth-guard.service';

export const AppRoutes: Routes = [

   {
      path: '',
      loadChildren: './authentication/authentication.module#AuthenticationModule',
      resolve: {
          config: ConfigResolveService
      }
   },
   {
      path: 'carrier',
      loadChildren: './shopify-app/shopify-app.module#ShopifyAppModule',
      canActivate: [AuthGuardService],
      resolve: {
          config: ConfigResolveService
      }
   },

   {
      path: '**',
      redirectTo: 'login'
   }
   ];

@NgModule({
  imports: [RouterModule.forRoot(AppRoutes)],
  exports: [RouterModule],
  providers: []
})
export class RoutingModule { }


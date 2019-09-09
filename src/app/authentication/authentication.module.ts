import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule} from '@ngx-translate/core';
import { ErrorHandlingModule } from '../error-handling/error-handling.module';
import { ConfigModule } from '../config/config.module';
import { HttpRequestIndicatorModule } from '../http-request-indicator/http-request-indicator.module';
import { NgrxModule } from '../ngrx/ngrx.module';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { ManageSessionComponent } from './components/manage-session/manage-session.component';
import { TestComponent } from './components/test/test.component';
import { AuthenticationRoutingModule } from './authentication-routing.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    ConfigModule,
    ErrorHandlingModule,
    HttpRequestIndicatorModule,
    NgrxModule,
    AuthenticationRoutingModule,
  ],
  declarations: [
    LoginComponent,
    LogoutComponent,
    ManageSessionComponent,
    TestComponent
  ],
  exports: [
    LoginComponent,
    LogoutComponent,
    ManageSessionComponent,
    TestComponent,
  ]
})
export class AuthenticationModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { Ng2Rut } from 'ng2-rut';


@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2Rut,
    TranslateModule,
  ],
  declarations: [
    UserEditComponent,
    UserFormComponent,
  ]
})
export class UserModule { }

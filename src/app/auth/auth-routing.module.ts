import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';
import {RouterModule, Routes} from '@angular/router';
import {AuthComponent} from './auth.component';

const routes: Routes = [
  {path: '', component: AuthComponent, children: [
      { path: '', redirectTo: 'login', pathMatch: 'full'},
      { path: 'login', component: LoginComponent},
      { path: 'registration', component: RegistrationComponent}
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AuthRoutingModule { }

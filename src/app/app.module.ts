import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireDatabaseModule} from 'angularfire2/database';
import {AuthModule} from './auth/auth.module';
import {AppRoutingModule} from './app-routing.module';
import {UsersService} from './shared/services/users.service';
import {HttpClientModule} from '@angular/common/http';
import {AuthService} from './shared/services/auth.service';
import {AngularFireAuth} from 'angularfire2/auth';
import {SystemModule} from './system/system.module';
import {CommonFunctionService} from './shared/Methods/common-function.service';
import {AuthGuard} from './shared/services/auth.guard';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AuthModule,
    AppRoutingModule,
    HttpClientModule,
    SystemModule
  ],
  providers: [
    UsersService,
    AuthService,
    AngularFireAuth,
    CommonFunctionService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import { BillPageComponent } from './bill-page/bill-page.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { PlanningPageComponent } from './planning-page/planning-page.component';
import { RecordsPageComponent } from './records-page/records-page.component';
import {SystemComponent} from './system.component';
import {SystemRoutingModule} from './system-routing.module';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { DropdownDirective } from './shared/directives/dropdown.directive';
import {AuthService} from '../shared/services/auth.service';
import {AngularFireAuth} from 'angularfire2/auth';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SystemRoutingModule
  ],
  declarations: [
    SystemComponent,
    BillPageComponent,
    HistoryPageComponent,
    PlanningPageComponent,
    RecordsPageComponent,
    SidebarComponent,
    DropdownDirective
  ]
})
export class SystemModule { }

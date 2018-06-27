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
import { HeaderComponent } from './shared/components/header/header.component';
import { BillCardComponent } from './bill-page/bill-card/bill-card.component';
import { CurrencyCardComponent } from './bill-page/currency-card/currency-card.component';
import {BillService} from './shared/services/bill.service';
import { CalcCardComponent } from './bill-page/calc-card/calc-card.component';
import { AddCategoryComponent } from './records-page/add-category/add-category.component';
import { AddEventComponent } from './records-page/add-event/add-event.component';
import { EditCategoryComponent } from './records-page/edit-category/edit-category.component';
import {CategoriesService} from './shared/services/categories.service';
import {EventCategoriesService} from './shared/services/event-categories.service';
import { SetBillComponent } from './bill-page/set-bill/set-bill.component';
import { DeleteCategoryComponent } from './records-page/delete-category/delete-category.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SystemRoutingModule,
  ],
  declarations: [
    SystemComponent,
    BillPageComponent,
    HistoryPageComponent,
    PlanningPageComponent,
    RecordsPageComponent,
    SidebarComponent,
    DropdownDirective,
    HeaderComponent,
    BillCardComponent,
    CurrencyCardComponent,
    CalcCardComponent,
    AddCategoryComponent,
    AddEventComponent,
    EditCategoryComponent,
    SetBillComponent,
    DeleteCategoryComponent
  ],
  providers: [
    BillService,
    CategoriesService,
    EventCategoriesService
  ]
})
export class SystemModule { }

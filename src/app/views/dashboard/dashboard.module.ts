import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';


import { DashboardRoutingModule } from './dashboard-routing.module';

import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ],
  providers: [
    DecimalPipe // Para permitir ser injetado no construtor em dashboard.component.ts
  ]
})
export class DashboardModule { }

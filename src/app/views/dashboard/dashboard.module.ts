import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';


import { DashboardRoutingModule } from './dashboard-routing.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatIconModule,
  ],
  providers: [
    DecimalPipe // Para permitir ser injetado no construtor em dashboard.component.ts
  ]
})
export class DashboardModule { }

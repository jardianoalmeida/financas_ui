import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, FormGroup } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatFormFieldModule, MatFormFieldControl} from '@angular/material/form-field';

import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

import { ReactiveFormsModule } from '@angular/forms';

import { AuthGuard } from './auth.guard';
import { SegurancaRoutingModule } from './seguranca-routing.module';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FinancasHttpInterceptor } from './financas-http-interceptor';
import { environment } from '../../environments/environment.prod';
import { LoginComponent } from './login/login.component';

export function tokenGetter(): string {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,



    FormsModule, ReactiveFormsModule,

    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,

    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: environment.tokenWhitelistedDomains,
        blacklistedRoutes: environment.tokenBlacklistedRoutes
      }
    }),

    SegurancaRoutingModule
  ],
  providers: [
    AuthGuard,
    JwtHelperService,
    {
        provide: HTTP_INTERCEPTORS,
        useClass: FinancasHttpInterceptor,
        multi: true
    },

  ]
})
export class SegurancaModule { }

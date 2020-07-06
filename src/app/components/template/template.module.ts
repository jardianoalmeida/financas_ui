import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LancamentoService } from './../../views/lancamentos/lancamento.service';
import { PessoaService } from './../../views/pessoas/pessoa.service';
import { DashboardService } from './../../views/dashboard/dashboard.service';
import { DashboardModule } from './../../views/dashboard/dashboard.module';
import { CategoriaService } from './../../categorias/categoria.service';
import { SharedModule } from './../shared/shared.module';
import { RelatoriosService } from './../../views/relatorios/relatorios.service';
import { NavComponent } from './nav/nav.component';
import { Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';



import { JwtHelperService } from '@auth0/angular-jwt';

import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule} from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";


import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { NaoAutorizadoComponent } from './nao-autorizado.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AuthService } from 'src/app/seguranca/auth.service';

registerLocaleData(localePt);


@NgModule({
  declarations: [
    NavComponent,
    HeaderComponent,
    FooterComponent,
    PaginaNaoEncontradaComponent,
    NaoAutorizadoComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
  ],
  exports : [
    NavComponent,
    HeaderComponent,
    FooterComponent,
  ],
providers: [
  // ErrorHandlerService,
  // LancamentoService,
   PessoaService,

  // CategoriaService,
  // RelatoriosService,
  LancamentoService,
  DashboardModule,
  DashboardService,
  CategoriaService,
  SharedModule,
  RelatoriosService,
  Title,
  AuthService,
  JwtHelperService,

  {provide: LOCALE_ID, useValue: 'pt-BR'} //Usado para formatar o valor
]
})
export class TemplateModule { }

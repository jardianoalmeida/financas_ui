import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';
import { AuthGuard } from './../../guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';

const routes: Routes = [
  { path: '',
  component: LancamentosPesquisaComponent,
  canActivate: [AuthGuard],
  data: { roles: ['ROLE_PESQUISAR_LANCAMENTO']}
  },
  { path: 'novo',
  component: LancamentoCadastroComponent,
  canActivate: [AuthGuard],
  data: { roles: ['ROLE_CADASTRAR_LANCAMENTO']}
  },
  { path: ':codigo',
  component: LancamentoCadastroComponent,
  canActivate: [AuthGuard],
  data: { roles: ['ROLE_PESQUISAR_LANCAMENTO']}
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class LancamentosRoutingModule { }

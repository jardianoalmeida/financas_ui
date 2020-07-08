import { NaoAutorizadoComponent } from './components/template/nao-autorizado.component';
import { PaginaNaoEncontradaComponent } from './components/template/pagina-nao-encontrada.component';
import { LoginComponent } from './seguranca/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HomeComponent} from "./views/home/home.component";
import {ProductCrudComponent} from "./views/notificacao-crud/notificacao-crud.component";
import {ProductCreateComponent} from "./components/notificacao/notificacao-create/notificacao-create.component";
import {ProductUpdateComponent} from "./components/notificacao/notificacao-update/notificacao-update.component";
import {ProductDeleteComponent} from "./components/notificacao/notificacao-delete/notificacao-delete.component";
import { AuthGuard } from './guards/auth.guard';
import { DashboardComponent } from './views/dashboard/dashboard/dashboard.component';


const routes: Routes = [
   // {path: "", component: HomeComponent, canActivate: [AuthGuard]},
    //{path: "login", component: LoginComponent},
    //{ path: 'dashboard', loadChildren: () => import('dashboard/dashboard.module').then(m => m.DashboardModule) },
   // {path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard]},
   {path: "notificacao", component: ProductCrudComponent},
   {path: "notificacao/create", component: ProductCreateComponent, canActivate: [AuthGuard]},
   {path: "products/update/:id", component: ProductUpdateComponent, canActivate: [AuthGuard]},
   {path: "products/delete/:id", component: ProductDeleteComponent, canActivate: [AuthGuard]},

   { path: 'dashboard', loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule) },
   { path: 'lancamentos', loadChildren: () => import('./views/lancamentos/lancamentos.module').then(m => m.LancamentosModule) },
   { path: 'pessoas', loadChildren: () => import('./views/pessoas/pessoas.module').then(m => m.PessoasModule) },
   { path: 'relatorios', loadChildren: () => import('./views/relatorios/relatorios.module').then(m => m.RelatoriosModule) },


   { path: '', redirectTo: 'login', pathMatch: 'full' }, //acho que é o correto!
   { path: 'nao-autorizado', component: NaoAutorizadoComponent },
   { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },
   { path: '**', redirectTo: 'pagina-nao-encontrada' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

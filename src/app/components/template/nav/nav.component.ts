import { Router } from '@angular/router';
import { ErrorHandlerService } from './../error-handler.service';
import { AuthService } from 'src/app/seguranca/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  exibindoMenu = false;

  constructor(
    public authService: AuthService,
    private auth: AuthService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
   // private confirmation: ConfirmationService,

  ) { }

  ngOnInit() {
  }

  criarNovoAccessToken() {
    this.auth.obterNovoAccessToken();
  }

  logout() {
    this.authService.logout()
         .then(() => {
           this.router.navigate(['/login']);
         })
         .catch(erro => this.errorHandler.handle(erro));

    // this.confirmation.confirm({
    //   header: 'Sistema Financeiro',
    //   message: 'Deseja sair do Sistema?',
    //   accept: () => {
    //     this.authService.logout()
    //     .then(() => {
    //       this.router.navigate(['/login']);
    //     })
    //     .catch(erro => this.errorHandler.handle(erro));
    //   }
    // });
  }


}

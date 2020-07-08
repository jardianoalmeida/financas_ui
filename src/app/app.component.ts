import { Router } from '@angular/router';
import { Component, NgModule, ViewChild, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TestarFcmComponent } from './components/shared/testar-fcm/testar-fcm.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthServiceAux } from './seguranca/login/auth/auth.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  title = 'frontend';
  mostrarMenu: boolean = true;
  constructor(private router: Router, private authService: AuthServiceAux, public dialog: MatDialog){}

  ngOnInit(): void {
    this.authService.mostrarMenuEmitter.subscribe(
      mostrar => this.mostrarMenu = mostrar
    );
    //this.exibindoNavBar();
  }

  exibindoNavBar(): boolean {
    console.log(this.router.url !== '/login');
    return this.router.url !== '/login';
  }


}

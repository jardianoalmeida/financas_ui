import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthServiceAux } from '../seguranca/login/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate{

  constructor(private authService: AuthServiceAux, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    ) : Observable<boolean> | boolean {

      if(this.authService.usuarioEstaAutenticado){
        return true;
      }

      this.router.navigate(['/login']);
      return false;
  }
}

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from '@angular/common/http';

import { Observable, from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { AuthService } from './auth.service';

export class NotAuthenticatedError {}

@Injectable()
export class FinancasHttpInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService
    ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!req.url.includes('/oauth/token') && this.authService.isAccessTokenInvalido()) {

      return from(this.authService.obterNovoAccessToken())
          .pipe(
              mergeMap(() => {
                if (this.authService.isAccessTokenInvalido()) {
                  throw new NotAuthenticatedError();
                 }
                req = req.clone({
                      setHeaders: {
                          Authorization: `Bearer ${localStorage.getItem('token')}`
                      }
                  });
                return next.handle(req);
              })
          );
      }
    return next.handle(req);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { environment } from './../../environments/environment';
import { environment } from './../../environments/environment.prod';

import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl: string;

  tokensRenokeUrl: string;

  jwtPayload: any;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
  ) {
    this.oauthTokenUrl = `${environment.apiUrl}/oauth/token`;

    this.tokensRenokeUrl = `${environment.apiUrl}/tokens/revoke`;

    this.carregarToken();
  }

  logout() {
    return this.http.delete(this.tokensRenokeUrl, { withCredentials: true })
      .toPromise()
      .then(() => {
        localStorage.removeItem('token');
        this.jwtPayload = null;
      });
  }


    login(usuario: string, senha: string): Promise<void> {
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', 'Basic YW5ndWxhcjoxMjNtdWRAUg==').set('Content-Type', 'application/x-www-form-urlencoded');

      const body = `username=${usuario}&password=${senha}&grant_type=password`;

      return this.http.post(this.oauthTokenUrl, body, { headers, withCredentials: true})
      .toPromise()
      .then(response => {
        console.log(response);
        this.armazenarToken(response['access_token'])
      })
      .catch(response => {
        const responseError = response.error;

        if (response.status === 400) {
          if (responseError.error === 'invalid_grant') {
            return Promise.reject('Usuário ou senha inválida');

          }
        }
        return Promise.reject(response);
    });

    }



    isAccessTokenInvalido() {
      const token = localStorage.getItem('token');
      return !token || this.jwtHelper.isTokenExpired(token);
    }

    obterNovoAccessToken(): Promise<void> {
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', 'Basic YW5ndWxhcjoxMjNtdWRAUg==').set('Content-Type', 'application/x-www-form-urlencoded');

      const body = 'grant_type=refresh_token';

      return this.http.post(this.oauthTokenUrl, body, { headers, withCredentials: true })
        .toPromise()
        .then(response => {
          this.armazenarToken(response['access_token'])
          console.log('Novo access token criado!');
          return Promise.resolve(null);
        })
        .catch(response => {
          console.error('Erro ao renovar token.', response);
          return Promise.resolve(null);
        });
    }

    temPermissao(permissao: string) {
      return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
    }

    temQualquerPermissao(roles) {
      for (const role of roles) {
        if (this.temPermissao(role)) {
          return true;
        }
      }
      return false;
    }

    private armazenarToken(token: string) {
      this.jwtPayload = this.jwtHelper.decodeToken(token);
      localStorage.setItem('token', token); // Esse token fica armazenado no navegador do usuario
    }

    private carregarToken() {
      const token = localStorage.getItem('token');

      if (token) {
        this.armazenarToken(token);
      }
    }




}

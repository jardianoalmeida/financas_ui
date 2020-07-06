import { Usuario } from './../../../models/usuario.model';
import { Router } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import { Observable, EMPTY } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/internal/operators/take';
import { catchError } from 'rxjs/internal/operators/catchError';
import { map } from 'rxjs/internal/operators/map';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceAux {

  constructor(private router: Router, private snackBar: MatSnackBar, private http: HttpClient) { }


  private usuario: Usuario = new Usuario();
  private usuarioAutenticado: boolean = true;
  mostrarMenuEmitter = new EventEmitter<boolean>();


  fazerLogin(usuario: Usuario){

  //   return this.http.post(this.url, this.postLogin).subscribe((response: any) => {
  //       this.showMessage(response.status, false);
  // }, (err) => {
  //       console.log(err.status);
  //       this.showMessage("Ocorreu um erro!: " + err.status, false);
  // });


    /*

     if(err.status == 200){
          this.usuarioAutenticado = true;
          this.router.navigate(['/']);
          this.mostrarMenuEmitter.emit(true);
          } else {
            this.mostrarMenuEmitter.emit(false);
            this.usuarioAutenticado = false;
          }
    return this.http.post<Usuario>(this.url, this.postLogin).toPromise().then((data: any) => {
      console.log(data);
      console.log(data.json);
      this.json = JSON.stringify(data.json);

    }); */

   this.usuarioAutenticado = true;
   this.router.navigate(['/']);
  this.mostrarMenuEmitter.emit(true);

  /*
    if(true){
      this.usuarioAutenticado = true;
      this.router.navigate(['/']);
      this.mostrarMenuEmitter.emit(true);
      } else {
        this.mostrarMenuEmitter.emit(false);
        this.usuarioAutenticado = false;
      }*/

  }

  usuarioEstaAutenticado(){
    return this.usuarioAutenticado;
  }


  showMessage(msg: string, isError: boolean = false) {
    this.snackBar.open(msg, 'x', {
        duration: 3000,
        horizontalPosition: "right",
        verticalPosition: "top",
        panelClass: isError ? ['msg-error'] : ['msg-success']
    })
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage('Ocorreu um erro', true);
    return EMPTY;
  }

}

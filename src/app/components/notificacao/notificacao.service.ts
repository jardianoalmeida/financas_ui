import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpClient} from "@angular/common/http";
import {Product} from "./notificacao.model";
import {EMPTY, Observable} from "rxjs";
import {catchError, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

//  baseUrl = 'http://localhost:3000';
  baseUrl = 'http://localhost:8090/api/v1/';

  constructor(private http: HttpClient,
              private snackBar: MatSnackBar) { }

  showMessage(msg: string, isError: boolean = false) {
    this.snackBar.open(msg, 'x', {
        duration: 3000,
        horizontalPosition: "right",
        verticalPosition: "top",
        panelClass: isError ? ['msg-error'] : ['msg-success']
    })
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}/notificacao`, product)
        .pipe(
            map(obj => obj),
            catchError(e => this.errorHandler(e))
        )
  }

  read(): Observable<Product[]> {
      return this.http.get<Product[]>(`${this.baseUrl}/notificacao`)
          .pipe(
              map(obj => obj),
              catchError(e => this.errorHandler(e))
          );
  }

  readById(id: string): Observable<Product> {
     return this.http.get<Product>(`${this.baseUrl}/notificacao/${id}`)
         .pipe(
             map(obj => obj),
             catchError(e => this.errorHandler(e))
         )
  }

  update(product: Product): Observable<Product> {
      return this.http.put<Product>(`${this.baseUrl}/notificacao/${product.id}`, product)
          .pipe(
              map(obj => obj),
              catchError(e => this.errorHandler(e))
          )
  }

  delete(id: number): Observable<Product> {
      return this.http.delete<Product>(`${this.baseUrl}/notificacao/${id}`)
          .pipe(
              map(obj => obj),
              catchError(e => this.errorHandler(e))
          )
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage('Ocorreu um erro', true);
    return EMPTY;
  }
}

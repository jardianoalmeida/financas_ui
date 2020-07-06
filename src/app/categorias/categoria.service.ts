import { Injectable } from '@angular/core';
// import { environment } from './../../environments/environment';
import { environment } from './../../environments/environment.prod';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categoriasUrl: string;

  constructor(
    private http: HttpClient
  ) {
    this.categoriasUrl = `${environment.apiUrl}/categorias`;
   }

  listarTodas(): Promise<any> {

    return this.http.get(this.categoriasUrl)
      .toPromise()
      .then(pessoas => pessoas);
  }


}

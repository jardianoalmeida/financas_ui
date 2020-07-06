import { Pessoa, Cidade } from './../../components/template/model';
import { Injectable } from '@angular/core';
// import { environment } from './../../environments/environment';
import { environment } from './../../../environments/environment.prod';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';




export class PessoaFilter {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  pessoasUrl: string;
  cidadesUrl: string;
  estadosUrl: string;

  constructor(
    private http: HttpClient
  ) {
    this.pessoasUrl = `${environment.apiUrl}/pessoas`;
    this.cidadesUrl = `${environment.apiUrl}/cidades`;
    this.estadosUrl = `${environment.apiUrl}/estados`;
  }

  pesquisar(filtro: PessoaFilter): Promise<any> {

    let params = new HttpParams();

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.pessoasUrl}`, { params })
      .toPromise()
      .then(response => {
        const pessoas = response['content']
        const resultado = {
          pessoas,
          total: response['totalElements']
        }
        return resultado;
      });
  }

  listarTodas(): Promise<any> {

    return this.http.get(this.pessoasUrl)
    .toPromise()
    .then(response => response['content']);
}



  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.pessoasUrl}/${codigo}`)
    .toPromise()
    .then(()=> null);
  }


  mudarStatus(codigo: number, ativo: boolean): Promise<void> {
    let headers = new HttpHeaders();
   // const headers = new HttpHeaders({'h1':'v1','h2':'v2'});
   // headers = headers.set('h1', 'v1').set('h2','v2');
    headers = headers.set('Content-Type', 'application/json');

    return this.http.put(`${this.pessoasUrl}/${codigo}/ativo`, ativo, { headers })
      .toPromise()
      .then(() => null);
  }

  adicionar(pessoa: Pessoa): Promise<Pessoa> {
    let headers = new HttpHeaders();

    headers = headers.set('Content-Type', 'application/json');

    return this.http.post<Pessoa>(
     this.pessoasUrl, pessoa, {headers})
      .toPromise();
  }


  atualizar(pessoa: Pessoa): Promise<Pessoa> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.put<Pessoa>(`${this.pessoasUrl}/${pessoa.codigo}`, pessoa, { headers })
      .toPromise()
      .then(response => {
       // const pessoaAlterada = response;

        //return pessoaAlterada;
        return response;
      });
  }



  buscarPorCodigo(codigo: number): Promise<Pessoa> {
    return this.http.get(`${this.pessoasUrl}/${codigo}`)
      .toPromise()
      .then(response => {
        const pessoa = response as Pessoa;

        return pessoa;
      });
  }

  listarEstados(): Promise<any> {
    return this.http.get(this.estadosUrl)
      .toPromise()
      .then(response => response)
      .catch(response => {
        console.error('Erro ao pesquisar estados.', response);
        return response;
      });
  }

  pesquisarCidades(estado): Promise<any> {
    const params = new HttpParams()
      .set('estado', estado);

    return this.http.get(this.cidadesUrl, { params })
      .toPromise()
      //.then(response => response) de outro projeto
      .then(response => response as Cidade[])
      .catch(response => {
        console.error('Erro ao pesquisar cidades.', response);
        return response;
      });
  }


}

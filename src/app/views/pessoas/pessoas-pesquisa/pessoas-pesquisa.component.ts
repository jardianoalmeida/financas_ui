import { Product } from './../../../components/notificacao/notificacao.model';
import { Title } from '@angular/platform-browser';
import { LancamentoService, LancamentoFilter } from './../../lancamentos/lancamento.service';
import { ErrorHandlerService } from './../../../components/template/error-handler.service';
import { Component, OnInit, ViewChild } from '@angular/core';

import { PessoaService, PessoaFilter } from './../pessoa.service';
import { AuthService } from 'src/app/seguranca/auth.service';


@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new PessoaFilter();

  pessoas = [];

  products: Product[];
  displayedColumns = ["nomePessoa", "cidade", "estado", "status", "action"];

 // @ViewChild('tabela', { static: true }) grid: Table;

  constructor(
    private pessoaService: PessoaService,
   // private messageService: MessageService,
   // private confirmation: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    public authService: AuthService
  ) { }

  br: any; //Usado para formatar Data

  ngOnInit() {
    //this.title.setTitle('Pesquisa de Lancamentos');

    // this.productService.read()
    // .subscribe((products) => {
    //     this.products = products;
    // });
    this.pesquisar();
  }
  pesquisar(pagina = 0) {

    this.filtro.pagina = pagina;

    this.pessoaService.pesquisar(this.filtro)
      .then(resultado => {
        console.log(resultado.pessoas.endereco.cidade);
        this.totalRegistros = resultado.total;
        this.pessoas = resultado.pessoas;
      });
  }

}

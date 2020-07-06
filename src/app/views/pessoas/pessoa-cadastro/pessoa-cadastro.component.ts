import { ProductService } from './../../../components/notificacao/notificacao.service';
import { ErrorHandlerService } from './../../../components/template/error-handler.service';
import { Pessoa } from './../../../components/template/model';
import { Component, OnInit } from '@angular/core';
import {  FormControl } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';



import { PessoaService } from '../pessoa.service';


@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

   pessoa = new Pessoa();
   estados: any[];
   cidades: any[];
   estadoSelecionado: number;

  status = [
    { label: 'Ativo', value: true },
    { label: 'Inativo', value: false },
  ];

  constructor(
    private pessoaService: PessoaService,
    private productService: ProductService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }


  ngOnInit() {
    this.title.setTitle('Nova Pessoa');
    const codigoPessoa = this.route.snapshot.params['codigo'];
    this.carregarEstados();
    // Checa se existe o codigo Pessoa
    if (codigoPessoa) {
      this.carregarPessoa(codigoPessoa);
    }

  }

  carregarEstados() {
    this.pessoaService.listarEstados()
      .then(lista => {
        this.estados = lista.map( uf  => ({ label: uf.nome, value: uf.codigo }) )
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  alterouEstado() {
    this.pessoa.endereco.cidade.codigo = null;
    this.carregarCidades();
  }

  carregarCidades() {
    // console.log('Estado',this.estadoSelecionado);
    this.pessoaService.pesquisarCidades(this.estadoSelecionado).then(lista => {
      this.cidades = lista.map(c => ({ label: c.nome, value: c.codigo }));
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  carregarPessoa(codigo: number) {
    return this.pessoaService.buscarPorCodigo(codigo)
      .then((data) => {
        this.pessoa = data;
        this.estadoSelecionado = (this.pessoa.endereco.cidade) ? this.pessoa.endereco.cidade.estado.codigo : null;
        if (this.estadoSelecionado) {
          this.carregarCidades();
        }
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  get editando() {
    return Boolean(this.pessoa.codigo);
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizar(form);
    } else {
      this.adicionar(form);
    }
  }

  adicionar(form: FormControl) {
    this.pessoaService.adicionar(this.pessoa)
      .then(() => {
        this.productService.showMessage('Pessoa adicionada com sucesso!');

       // this.messageService.add({ severity: 'success', detail: 'Pessoa adicionada com sucesso!' });
        this.router.navigate(['/pessoas']);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  novo(form: FormControl) {
    form.reset();
     // o setTimeout é para corrigir um BUG, pois se executar imediatamente o código new abaixo
    // a construção tipo = 'RECEITA' do objeto não funciona!!!!  Atentar para colocar o bind.
    setTimeout(function() {
      this.pessoa = new Pessoa();
    }.bind(this), 1);
    this.router.navigate(['/pessoas/novo']);
  }

  atualizar(form: FormControl) {
    this.pessoaService.atualizar(this.pessoa)
      .then((data) => {
        // this.messageService.add({
        //   severity: 'success',
        //   detail: 'Pessoa alterada com sucesso!'
        // });
        this.productService.showMessage('Pessoa alterada com sucesso!');
        this.pessoa = data;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de pessoa: ${this.pessoa.nomePessoa}`);
  }

}

import { Lancamento } from './../../../components/template/model';
import { ErrorHandlerService } from './../../../components/template/error-handler.service';
import { PessoaService } from './../../pessoas/pessoa.service';
import { CategoriaService } from './../../../categorias/categoria.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';


import { LancamentoService } from './../lancamento.service';


interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {
  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];
  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,
    //private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private formBuilder: FormBuilder
  ) { }

  br: any;

  tipos = [
    {label: 'Receita', value: 'RECEITA'},
    {label: 'Despesa', value: 'DESPESA'},
  ];

  categorias = [];
  pessoas = [];

  // lancamento = new Lancamento();
  formulario: FormGroup;

  uploadEmAndamento = false;


  ngOnInit() {
    this.configurarFormulario();

   // console.log(this.route.snapshot.params['codigo']);
    const codigoLancamento = this.route.snapshot.params['codigo'];

    // Checa se existe o codigo Lancamento
    if (codigoLancamento) {
      this.carregarLancamentos(codigoLancamento);
    }

    this.carregarCategorias();
    this.carregarPessoasAtivas();

      this.br = {
          firstDayOfWeek: 0,
          dayNames: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
          dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
          dayNamesMin: ["Do","Se","Te","Qu","Qu","Se","Sa"],
          monthNames: [ "Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro" ],
          monthNamesShort: [ "Jan", "Fev", "Mar", "Abr", "Mai", "Jun","Jul", "Ago", "Set", "Out", "Nov", "Dez" ],
          today: 'Hoje',
          clear: 'Limpar',
          dateFormat: 'dd/mm/yy',
          weekHeader: 'Wk'
      };
  }


  aoTerminarUploadAnexo(event) {
    const anexo = event.originalEvent.body;

    this.formulario.patchValue({
      anexo: anexo.nome,
      urlAnexo: anexo.url
    });
    this.uploadEmAndamento = false;
  }

  erroUpload(event) {
   // this.messageService.add({ severity: 'error', detail: 'Erro ao tentar enviar anexo!' });
    this.uploadEmAndamento = false;
  }

  uploadAnexoEmAndamento(event) {
    this.uploadEmAndamento = true;
  }

  removerAnexo() {
    this.formulario.patchValue({
      anexo: null,
      urlAnexo: null
    });
  }

  get nomeAnexo() {
    const nome = this.formulario.get('anexo').value;

    if (nome) {
      return nome.substring(nome.indexOf('_') + 1, nome.length);
    }

    return '';
  }

  get urlUploadAnexo() {
    return this.lancamentoService.urlUploadAnexo();
  }

  public validateFileSize($event: any, maxFileSize: number): void {
    if ($event.files[0].size > maxFileSize) {
    //  this.messageService.add({ severity: 'error', detail: ' Este arquivo excedeu o tamanho máximo permitido de ' + maxFileSize/(1024*1024) +"MB" });
      this.uploadEmAndamento = false;
    }
  }


  configurarFormulario() {
    this.formulario =  this.formBuilder.group({
      codigo: [],
      tipo: ['RECEITA', Validators.required],
      dataVencimento: [null, Validators.required],
      dataPagamento: [],
      descricao: [null, [this.validarCampoRequerido, this.validarCampoTamanhoMinimo(5)]],
      valor: [null, Validators.required],
      pessoa: this.formBuilder.group({
        codigo: [null, Validators.required],
        nomePessoa: []
      }),
      categoria: this.formBuilder.group({
        codigo: [null, Validators.required],
        nomeCategoria: []
      }),
      observacao: [],
      anexo: [],
      urlAnexo: []
    });
  }

  validarCampoRequerido(input: FormControl) {
    //Trecho de Exemplo usado para acessar qualquer elemento input do formulario , neste caso a data de vencimento
   // const dtVencimento = input.root.get('dataVencimento').value;

    return (input.value ? null : { obrigatoriedade: true });
  }

  validarCampoTamanhoMinimo(valor: number) {
    return (input: FormControl) => {
      return (!input.value || input.value.length >= valor) ? null : { tamanhoMinimo: { tamanho: valor }};
    };
  }

  get editando() {
    return Boolean(this.formulario.get('codigo').value);
  }

  carregarLancamentos(codigo: number) {
    this.lancamentoService.buscarPorCodigo(codigo)
    .then(lancamentoRecebido => {
      // this.lancamento = lancamentoRecebido;
      //this.formulario.setValue(lancamentoRecebido); // este funciona
      this.formulario.patchValue(lancamentoRecebido);
      this.atualizarTituloEdicao();
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  carregarCategorias() {
    return this.categoriaService.listarTodas()
      .then(categorias => {
        this.categorias = categorias.map(c => ({ label: c.nomeCategoria, value: c.codigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }


  carregarPessoasAtivas() {
    return this.pessoaService.listarTodas()
      .then(response => {
        this.pessoas = response.filter(pessoa => pessoa.ativo).map(p => ({ label: p.nomePessoa, value: p.codigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

salvar() {
  if (this.editando) {
    this.atualizarLancamento();
  } else {
    this.adicionarLancamento();
  }
}

  adicionarLancamento() {
    this.lancamentoService.adicionar(this.formulario.value)
      .then(lancamentoAdicionado => {
       // this.messageService.add({ severity: 'success', detail: 'Lançamento adicionado com sucesso!' });

       // this.router.navigate(['/lancamentos', lancamentoAdicionado.codigo]); Salva e vai para modo edicao
        this.router.navigate(['/lancamentos']); // Salva e vai para lista de lacamentos
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarLancamento() {

    this.lancamentoService.atualizar(this.formulario.value)
      .then(lancamentoRecebido => {

        this.formulario.patchValue(lancamentoRecebido);
      //  this.messageService.add({ severity: 'success', detail: 'Lançamento alterado com sucesso!' });

        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  novo() {
    this.formulario.reset();
    setTimeout(function():void {
      this.lancamento = new Lancamento();
    }.bind(this), 1);

    this.router.navigate(['/lancamentos/novo']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de lançamento: ${this.formulario.get('descricao').value}`);
  }



}

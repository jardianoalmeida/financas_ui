import { HttpClient } from '@angular/common/http';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Product } from './../../../components/notificacao/notificacao.model';
import { ErrorHandlerService } from './../../../components/template/error-handler.service';
import { AuthService } from 'src/app/seguranca/auth.service';
import { Component, OnInit, ViewChild, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';



import { LancamentoService, LancamentoFilter } from './../lancamento.service';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs/internal/Observable';


@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {
  itensColumns = ['pessoa', 'descricao', 'dataVencimento', 'dataVencimento', 'dataPagamento', 'valor', 'action'];
  //dataSource: MatTableDataSource<any>;
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  products: Product[];

  totalRegistros = 0;
  filtro = new LancamentoFilter();

  lancamentos = [];

 // @ViewChild('tabela', { static: true }) grid: Table;

  constructor(
    private lancamentoService: LancamentoService,
    //private messageService: MessageService,
  //  private confirmation: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private title: Title,
    public authService: AuthService
  ) { }

  br: any; //Usado para formatar Data

  ngOnInit() {
    this.title.setTitle('Pesquisa de Lancamentos');

    // this.productService.read()
    // .subscribe((products) => {
    //     this.products = products;
    // });
    this.pesquisar();
  }

  public doFilter = (value: string) => {
   // this.lancamentos.includes = value.trim().toLocaleLowerCase();
  }



  pesquisar(pagina = 2) {

    this.filtro.pagina = pagina;

    this.lancamentoService.pesquisar(this.filtro)
      .then(resultado => {
 //       console.log("totalRegistros: " + resultado.total);
//        console.log("lancamentos: " + resultado.lancamentos.dataVencimento);
        this.dataSource.data = resultado.lancamentos;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  aplicarFiltro(filterValue: string) {
    filterValue = filterValue.trim(); // Remover espaço em branco
    filterValue = filterValue.toLowerCase(); // A fonte de dados padroniza para correspondências em minúsculas
    this.dataSource.filter = filterValue;
  }

  aoMudarPagina() {
    //console.log(event);
   // const pagina = event.first / event.rows;
   // this.pesquisar(pagina);
  }

  confirmarExclusao(lancamento: any) {
    // this.confirmation.confirm({
    //   message: 'Tem certeza que deseja excluir este registro?',
    //   accept: () => {
    //     this.excluir(lancamento);
    //   }
    // });
  }

  excluir(lancamento: any) {
    this.lancamentoService.excluir(lancamento.codigo)
      .then(() => {
        //this.grid.reset();
      //  this.messageService.add({ severity: 'success', detail:'Lançamento excluído com sucesso!' });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}


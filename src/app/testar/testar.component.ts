import { MatTableDataSource } from '@angular/material/table';
import { ErrorHandlerService } from './../components/template/error-handler.service';
import { LancamentoService, LancamentoFilter } from './../views/lancamentos/lancamento.service';
import { Categoria, Pessoa, Lancamento } from './../components/template/model';

import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, fromEvent, merge, Observable} from 'rxjs';
import {map} from 'rxjs/operators';


@Component({
  selector: 'app-testar',
  templateUrl: './testar.component.html',
  styleUrls: ['./testar.component.css']
})

export class TestarComponent implements OnInit {
  itensColumns = ['pessoa', 'descricao', 'dataVencimento', 'dataVencimento', 'dataPagamento', 'valor'];
  //dataSource: MatTableDataSource<any>;
  dataSource = new MatTableDataSource();

  filtro = new LancamentoFilter();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private lancamentoService: LancamentoService, private errorHandler: ErrorHandlerService) { }

  ngOnInit() {

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
}

import { Component, OnInit } from '@angular/core';
import {ProductService} from "../notificacao.service";
import {Product} from "../notificacao.model";

@Component({
  selector: 'app-notificacao-read',
  templateUrl: './notificacao-read.component.html',
  styleUrls: ['./notificacao-read.component.css']
})
export class ProductReadComponent implements OnInit {

  products: Product[];
  displayedColumns = ["id", "titulo", "mensagem", "segmentacao", "secretaria", "imagem", "action"];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.read()
        .subscribe((products) => {
            this.products = products;
        });
  }

}

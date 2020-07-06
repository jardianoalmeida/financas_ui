import { Component, OnInit } from '@angular/core';
import {ProductService} from "../notificacao.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Product} from "../notificacao.model";

@Component({
  selector: 'app-notificacao-delete',
  templateUrl: './notificacao-delete.component.html',
  styleUrls: ['./notificacao-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  product: Product;

  constructor(private productService: ProductService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('id');
      this.productService.readById(id).subscribe((product) => {
        this.product = product;
      })
  }

  deleteProduct(): void {
      this.productService.delete(this.product.id).subscribe(() => {
          this.productService.showMessage("Removido com sucesso");
          this.router.navigate(['/notificacao']);
      })
  }

    cancel(): void {
        this.router.navigate(['/notificacao']);
    }

}

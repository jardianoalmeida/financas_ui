import {Component, OnInit} from '@angular/core';
import {Product} from "../notificacao.model";
import {ProductService} from "../notificacao.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-notificacao-update',
    templateUrl: './notificacao-update.component.html',
    styleUrls: ['./notificacao-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

    product: Product;

    constructor(private productService: ProductService,
                private router: Router,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        this.productService
            .readById(id)
            .subscribe((product) => {
                this.product = product;
            })
    }

    updateProduct(): void {
        this.productService.update(this.product)
            .subscribe((product) => {
                this.productService.showMessage('Salvo com sucesso!');
                this.router.navigate(['/notificacao']);
            });
    }

    cancel(): void {
        this.router.navigate(['/notificacao']);
    }

}

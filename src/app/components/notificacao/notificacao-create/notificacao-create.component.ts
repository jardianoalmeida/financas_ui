import { MatRadioChange } from '@angular/material/radio';
import { Component, OnInit } from '@angular/core';
import { ProductService } from "../notificacao.service";
import { Router } from "@angular/router";
import { Product } from "../notificacao.model";

import { MatDialog } from '@angular/material/dialog';
import { TestarFcmComponent } from '../../shared/testar-fcm/testar-fcm.component';

@Component({
  selector: 'app-product-create',
  templateUrl: './notificacao-create.component.html',
  styleUrls: ['./notificacao-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  product: Product = {
    titulo: '',
    mensagem: '',
    imagem: '',
    segmentacao: '',
    secretaria: ''
  };

  favoriteSeason: string;
  categoria: string[] = ['Ativos', 'Não ativos', 'Todos'];

  selected = ['option2'];
  columns = [{ value: 'option1', label: 'Option1' },  { value: 'option2', label: 'Option2' },  { value: 'option3', label: 'Option3' }];

  constructor(private productService: ProductService,
    private router: Router, public dialog: MatDialog) {

  }


  ngOnInit(): void {
  }

  createProduct(): void {
    this.product.secretaria = this.selected.toString();
    console.log(this.product);
     this.productService.create(this.product)
       .subscribe((product) => {
         this.productService.showMessage('Salvo com sucesso!');
         this.router.navigate(['/notificacao']);
       });
  }

  cancel(): void {
    this.router.navigate(['/notificacao']);
  }

  radioChange($event: MatRadioChange) {
    console.log($event.value);
    this.product.segmentacao = $event.value;
}

openDialog(): void {
  const dialogRef = this.dialog.open(TestarFcmComponent, {
    width: '400px',
  });

  dialogRef.afterClosed().subscribe(res => {
    console.log(res);
  });
}


}

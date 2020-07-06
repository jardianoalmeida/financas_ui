import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {HeaderService} from "../../components/template/header/header.service";

@Component({
  selector: 'app-notificacao-crud',
  templateUrl: './notificacao-crud.component.html',
  styleUrls: ['./notificacao-crud.component.css']
})
export class ProductCrudComponent implements OnInit {

  constructor(private router: Router, private headerService: HeaderService) {
    headerService.headerData = {
        title: 'Cadastro de Produtos',
        icon: 'storefront',
        routeUrl: '/products',
    }
  }

  ngOnInit(): void {
  }

  navigateToNotificacaoCreate(): void {
      this.router.navigate(['/notificacao/create'])
  }

}

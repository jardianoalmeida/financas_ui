import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagina-nao-encontrada',
  template: `
  <body style="background-color: #3F51B5;">
  <div class="card">
  <img src="assets/images/404.svg">

  <div>
    <h1>Página não encontrada!</h1>
    <br>

    <h4>O recurso que você está procurando não existe.</h4>
  </div>

  <div>
    <br>
    <br>

    <button pButton class="button" label="Voltar" onclick="window.history.go(-1); return false;"></button>
  </div>

</div></body>
  `,
  styles: [
    `.card {
      box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
      transition: 0.3s;
      display: block;
      margin-left: auto;
      margin-right: auto;
      margin-top: 20px;
      width: 25%;
      height:400px;
    }

    .card:hover {
      box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    }

    img {
      width:100px;
      height:100px;
    }

    h1, h4 {
      color: #aaa8a5
    }

    div {
      text-align: center;
    }

    .button {
      background-color:  #1e94d2;
    }
    `
  ]
})
export class PaginaNaoEncontradaComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

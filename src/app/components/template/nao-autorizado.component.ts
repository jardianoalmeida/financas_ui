import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nao-autorizado',
  template: `
  <div class="card">
    <img src="assets/images/401.svg">

    <div>
      <h1>Acesso negado!</h1>
      <br>

      <h4 class="text-center">Você não tem acesso autorizado a esse recurso</h4>
    </div>

    <div>
      <br>
      <br>
      <button pButton class="button" label="Voltar" onclick="window.history.go(-1); return false;"></button>
    </div>

</div>
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
      width:60px;
      height:60px;
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
export class NaoAutorizadoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

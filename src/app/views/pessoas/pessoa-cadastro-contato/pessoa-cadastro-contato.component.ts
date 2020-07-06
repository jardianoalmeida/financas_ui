import { Contato, Pessoa } from './../../../components/template/model';
import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';



@Component({
  selector: 'app-pessoa-cadastro-contato',
  templateUrl: './pessoa-cadastro-contato.component.html',
  styleUrls: ['./pessoa-cadastro-contato.component.css']
})
export class PessoaCadastroContatoComponent implements OnInit {

  @Input() contatos: Array<Contato>;
  @Input() formulario: FormGroup;

  pessoa = new Pessoa();

  contato: Contato;
  exbindoFormularioContato = false;
  contatoIndex: number;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
  }

  criarFormGroupContato(): FormGroup {
    return this.formBuilder.group({
      codigo: [],
      nome: [null, Validators.required],
      email: [null, Validators.required],
      telefone: [null, Validators.required]
    });
  }

  prepararNovoContato() {
    this.exbindoFormularioContato = true;
    this.contato = new Contato();
    this.contatoIndex = this.contatos.length;
  }

  prepararEdicaoContato(contato: Contato, index: number) {
    this.contato = this.clonarContato(contato);
    this.exbindoFormularioContato = true;
    this.contatoIndex = index;
  }

  confirmarContato(frm: FormControl) {
    this.pessoa.contatos.push(this.clonarContato(this.contato));
    this.contatos[this.contatoIndex] = this.clonarContato(this.contato);
    this.exbindoFormularioContato = false;
    frm.reset();
  }

  confirmarExclusao(indexRecebido: number) {
    // this.confirmation.confirm({
    //   message: 'Tem certeza que deseja excluir este registro?',
    //   accept: () => {
    //     this.removerContato(indexRecebido);
    //   }
    // });
  }

  removerContato(index: number) {
    this.contatos.splice(index, 1);
  }

  clonarContato(contato: Contato): Contato {
    return new Contato(contato.codigo,
      contato.nome, contato.email, contato.telefone);
  }

  get editando() {
    return this.contato && this.contato.codigo;
  }

}

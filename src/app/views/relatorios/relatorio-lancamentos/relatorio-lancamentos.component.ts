import { FormControl, Validators, FormGroupDirective, NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { RelatoriosService } from './../relatorios.service';
import { TestarFcmComponent } from './../../../components/shared/testar-fcm/testar-fcm.component';
import { MatRadioChange } from '@angular/material/radio';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from './../../../components/notificacao/notificacao.service';
import { Product } from './../../../components/notificacao/notificacao.model';
import { Component, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid);
    const invalidParent = !!(control && control.parent && control.parent.invalid);

    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-relatorio-lancamentos',
  templateUrl: './relatorio-lancamentos.component.html',
  styleUrls: ['./relatorio-lancamentos.component.css']
})
export class RelatorioLancamentosComponent implements OnInit{
  matcher = new MyErrorStateMatcher();
  myForm: FormGroup;

  startDate = "2017-11-25T22:00:00.000Z";
  endDate = "2017-11-24T22:00:00.000Z";


  periodoInicio: Date;
  periodoFim: Date;

  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

    constructor(private relatoriosService: RelatoriosService, private formBuilder: FormBuilder){
      this.myForm = this.formBuilder.group({
        'startDate': [''],
        'endDate': ['']
      }, { validator: this.checkDates });

      this.myForm.setValue({
        startDate: this.startDate,
        endDate: this.endDate
      });


    }

    checkDates(group: FormGroup) {
      if (group.controls.endDate.value < group.controls.startDate.value) {
        return { endDateLessThanStartDate: true }
      }
      return null;
    }

    ngOnInit(): void {
    }

    gerar() {
      console.log(this.periodoInicio + ' ' + this.periodoFim);
      this.relatoriosService.relatorioLancamentosPorPessoa(this.periodoInicio, this.periodoFim)
      .then(relatorio => {
        const url = window.URL.createObjectURL(relatorio);
        window.open(url);
      });

    }
  }

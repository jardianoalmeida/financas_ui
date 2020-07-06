import { AuthService } from './../auth.service';
import { Router } from '@angular/router';
import { ErrorHandlerService } from './../../components/template/error-handler.service';
import { Usuario } from './../../models/usuario.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  public loginInvalid: boolean;
  private formSubmitAttempt: boolean;

  public usuario: Usuario = new Usuario();

  constructor(
    private auth: AuthService,
    private errorHandlerService: ErrorHandlerService,
    private router: Router,
    private fb: FormBuilder
    ) {}


  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', Validators.email],
      senha: ['', Validators.required]
    });
  }

  async login(): Promise<void> {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    if (this.form.valid) {
      try {
        const email = this.form.get('email').value;
        const senha = this.form.get('senha').value;
        /// console.log(email + " " + senha);
        this.auth.login(email, senha)
          .then(() => {
           /// console.log("caiu aqui");
            this.router.navigate(['/dashboard']);
          })
          .catch(erro => {
            this.loginInvalid = true;
            this.errorHandlerService.handle(erro);
          });
      } catch (err) {
        this.loginInvalid = true;
      }
    } else {
      this.formSubmitAttempt = true;
    }
  }
}

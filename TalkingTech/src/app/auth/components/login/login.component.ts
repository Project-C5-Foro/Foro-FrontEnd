import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from './../../../core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  hide = true;
  toShow = true;

  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.buildForm();
   }

  ngOnInit(): void {
  }
  login(event: Event): void{
    event.preventDefault();
    if (this.form.valid){
      const value = this.form.value;
      this.authService.loginUser(value.email, value.password)
      .subscribe( data => {
        console.log(data);
        this.toShow = false;
        this.router.navigate(['/home', this.toShow]);
      }, error => {
        console.error(error);
        alert('Contraseña o correo incorrecto');
      });
    }else{
      alert('Contraseña o correo incorrecto x2');
    }
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

}

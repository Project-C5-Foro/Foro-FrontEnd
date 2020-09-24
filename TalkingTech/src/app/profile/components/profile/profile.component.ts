import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginResponse } from './../../../models/register.model';

import { AuthService } from '@core/auth.service';
import { ValidatorsPassword } from '@utils/validators-password';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  form: FormGroup;
  user: LoginResponse;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
  ) {
    this.buildForm();
   }

  ngOnInit(): void {
    let userData: any = sessionStorage.getItem('user');
    userData = JSON.parse(userData);
    this.user = userData.user;
  }
  register(event: Event): void{
    event.preventDefault();
    if ( this.form.valid ) {
      const value = this.form.value;
      console.log(value);
      this.authService.createUser(value)
      .subscribe(() => {
        alert('Registro exitoso');
      }, error => {
        console.error(error);
        alert('Registro Fallo');
      });
    }else{
      alert('Registro Fallo');
    }
  }
  private buildForm(): void {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
      first_name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
      last_name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), ValidatorsPassword.isPasswordValid]],
      password_confirmation: ['', [Validators.required, Validators.minLength(6), ValidatorsPassword.isPasswordValid]],
    });
  }

  get nameField(): AbstractControl{
    return this.form.get('username');
  }

}

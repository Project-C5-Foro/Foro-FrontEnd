import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { ValidatorsPassword } from '@utils/validators-password';
import { ValidatorsImg } from '@utils/validators-img';

import { AuthService } from '@core/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  hide = true;
  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  register(event: Event): void{
    event.preventDefault();
    if ( this.form.valid ) {
      const value = this.form.value;
      console.log(value);
      this.authService.createUser(value)
      .subscribe(data => {
        console.log(data)
        alert('Registro exitoso');
        this.router.navigate(['/home']);
      }, error => {
        console.error(error);
      });
    }else{
      alert('Registro Fallo');
    }
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
      firstname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
      last_name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), ValidatorsPassword.isPasswordValid]],
      password_confirmation: ['', [Validators.required, Validators.minLength(6), ValidatorsPassword.isPasswordValid]],
      image: ['', [Validators.required, ValidatorsImg.isImgValid]],
    });
  }

  get nameField(): AbstractControl{
    return this.form.get('username');
  }
  get firstnameField(): AbstractControl{
    return this.form.get('firstname');
  }

  get lastnameField(): AbstractControl{
    return this.form.get('last_name');
  }

  get emailField(): AbstractControl{
    return this.form.get('email');
  }

  get passwordField(): AbstractControl{
    return this.form.get('password');
  }
  get confirmpasswordField(): AbstractControl{
    return this.form.get('password_confirmation');
  }

  get imageField(): AbstractControl{
    return this.form.get('image');
  }
}

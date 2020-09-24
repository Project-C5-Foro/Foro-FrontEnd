import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { ValidatorsPassword } from '@utils/validators-password';
import { ValidatorsImg } from '@utils/validators-img';

import { AuthService } from '@core/auth.service';

import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @ViewChild('registerSwal') private registerSwal: SwalComponent;
  @ViewChild('errorSwal') private errorSwal: SwalComponent;

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
        console.log(data);
        this.registerSwal.fire();
      }, error => {
        console.error(error);
        this.errorSwal.fire();
      });
    }else{
      this.errorSwal.fire();
    }
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
      first_name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
      last_name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), ValidatorsPassword.isPasswordValid]],
      password_confirmation: ['', [Validators.required, Validators.minLength(8), ValidatorsPassword.isPasswordValid]],
      image: ['', [Validators.required, ValidatorsImg.isImgValid]],
    });
  }

  get nameField(): AbstractControl{
    return this.form.get('username');
  }
  get firstnameField(): AbstractControl{
    return this.form.get('first_name');
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
  successfullregister(): void{
    this.router.navigate(['/home']);
  }
}

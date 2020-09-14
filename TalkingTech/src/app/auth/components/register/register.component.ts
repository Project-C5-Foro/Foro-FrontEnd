import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { ValidatorsPassword } from '@utils/validators-password';
import { ValidatorsImg } from '@utils/validators-img';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  hide = true;
  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
      lastname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), ValidatorsPassword.isPasswordValid]],
      image: ['', [Validators.required, ValidatorsImg.isImgValid]],
    });
  }

  get nameField(): AbstractControl{
    return this.form.get('name');
  }

  get lastnameField(): AbstractControl{
    return this.form.get('lastname');
  }

  get emailField(): AbstractControl{
    return this.form.get('email');
  }

  get passwordField(): AbstractControl{
    return this.form.get('password');
  }

  get imageField(): AbstractControl{
    return this.form.get('image');
  }
}

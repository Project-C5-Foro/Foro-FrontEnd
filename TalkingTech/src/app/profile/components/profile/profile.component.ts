import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { LoginResponse } from '@models/register.model';

import { AuthService } from '@core/auth.service';
import { CategoryService } from '@core/category.service';

import { ValidatorsPassword } from '@utils/validators-password';

import { Category, CategoryResponse } from '@models/category.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  form: FormGroup;
  user: LoginResponse;
  category: Category;
  categories: CategoryResponse [] = [];

  constructor(
    private categoryService: CategoryService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
  ) {
    this.buildForm();
   }

  ngOnInit(): void {
    let userData: any = sessionStorage.getItem('user');
    userData = JSON.parse(userData);
    this.user = userData.user;
    this.fetchCategories();
  }

  fetchCategories(): void{
    this.categoryService.getCategory()
    .subscribe( categories => {
      this.categories = categories;
    });
  }

  createCategory(event: Event): void{
    event.preventDefault();
    this.categoryService.createCategory(this.category)
    .subscribe(() => {
      console.log('exito');
    }, err => {
      console.error(err);
    });
  }

  register(event: Event): void{
    event.preventDefault();
    if ( this.form.valid ) {
      const value = this.form.value;
      console.log(value);
      this.authService.createUser(value)
      .subscribe(() => {
        console.log('exito');
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
      category: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]]
    });
  }

  get nameField(): AbstractControl{
    return this.form.get('username');
  }
  get categoryField(): AbstractControl{
    return this.form.get('category');
  }

}

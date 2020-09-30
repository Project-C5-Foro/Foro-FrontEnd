import { Component, OnInit, ViewChild } from '@angular/core';

import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';

import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

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
  category: Category = {category: '' };
  categories: CategoryResponse [] = [];

  @ViewChild('createSwal') private createSwal: SwalComponent;
  @ViewChild('errorSwal') private errorSwal: SwalComponent;
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
// categories
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
      this.fetchCategories();
      this.createSwal.fire();
    }, () => {
      this.errorSwal.fire();
    });
  }
  deleteCategory(id: CategoryResponse): void{
    this.categoryService.delateCaetgory(id)
    .subscribe(rta => {
      this.fetchCategories();
    }, err => {
      console.error(err);
    });
  }
// categories
// register
  register(event: Event): void{
    event.preventDefault();
    if ( this.form.valid ) {
      const value = this.form.value;
      console.log(value);
      this.authService.createUser(value)
      .subscribe(() => {
        this.createSwal.fire();
      }, error => {
        console.error(error);
        this.errorSwal.fire();
      });
    }else{
      this.errorSwal.fire();
    }
  }
// register
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

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { Router, ActivatedRoute, Params } from '@angular/router';


import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

import { Category, CategoryResponse } from '@models/category.model';
import { LoginResponse, UserResponse } from '@models/register.model';
import { PostsResponse } from '@models/posts.model';

import { CategoryService } from '@core/category.service';
import { PostsService } from '@core/posts.service';
import { AuthService } from '@core/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userResponse: UserResponse;
  userDataResponse: UserResponse [] = [];
  user: LoginResponse;
  category: Category = {category: '' };
  categories: CategoryResponse [] = [];
  posts: PostsResponse [] = [];
  categoryEdit: FormControl;
  categoryselected: CategoryResponse;

  @ViewChild('createSwal') private createSwal: SwalComponent;
  @ViewChild('errorSwal') private errorSwal: SwalComponent;
  constructor(
    private authService: AuthService,
    private categoryService: CategoryService,
    private router: Router,
    private postsService: PostsService,
  ) {
    this.categoryEdit = new FormControl('', [
      Validators.required
    ]);
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
    }, () => {
      this.errorSwal.fire();
    });
  }

  editCategory(): void{
    if (this.categoryEdit.valid){
      const value = this.categoryEdit.value;
      value.category = this.categoryselected.category;
      value.category = this.categoryselected.status;
      this.categoryService.editCategory(this.categoryselected.id, value)
      .subscribe(() => {
        this.fetchCategories();
      });
    }
  }
  chooseCategory(category): void{
    this.categoryselected = category;
    this.categoryEdit.setValue(this.categoryselected.category);
  }

  deleteCategory(id: CategoryResponse): void{
    this.categoryService.delateCaetgory(id)
    .subscribe(rta => {
      this.fetchCategories();
      this.createSwal.fire();
    }, () => {
      this.errorSwal.fire();
    });
  }
// categories

// register
  register(): void{
    this.router.navigate(['/register']);
  }
// register

// post
  navigateCreate(): void{
    this.router.navigate(['home/create']);
  }
  fetchUserPost(user): void {
    // const user = this.user.username;
    this.authService.infoUser(user)
    .subscribe( userDataResponse => {
      this.userDataResponse = userDataResponse;
    });
  }
// post
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validator, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Router, ActivatedRoute, Params } from '@angular/router';


import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

import { Category, CategoryResponse } from '@models/category.model';
import { LoginResponse } from '@models/register.model';
import { PostsResponse } from '@models/posts.model';

import { CategoryService } from '@core/category.service';
import { PostsService } from '@core/posts.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: LoginResponse;
  category: Category = {category: '' };
  categories: CategoryResponse [] = [];
  posts: PostsResponse [] = [];
  categoryEdit: FormControl;
  categoryselected: CategoryResponse;

  @ViewChild('createSwal') private createSwal: SwalComponent;
  @ViewChild('errorSwal') private errorSwal: SwalComponent;
  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private postsService: PostsService,
    private activatedRoute: ActivatedRoute
  ) {
    this.categoryEdit = new FormControl('', [
      Validators.required
    ]);
   }
    myControl = new FormControl();
    filteredOptions: Observable<string[]>;

  ngOnInit(): void {
    let userData: any = sessionStorage.getItem('user');
    userData = JSON.parse(userData);
    this.user = userData.user;
    this.fetchCategories();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
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
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.fetchCategories.prototype(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
// categories

// register
  register(): void{
    this.router.navigate(['/register']);
  }
// register

// post
fetchPosts(): void{
  this.postsService.getAllPosts()
  .subscribe( posts => {
    this.posts = posts;
  });
  }
  navigateCreate(): void{
    this.router.navigate(['home/create']);
  }
// post
}

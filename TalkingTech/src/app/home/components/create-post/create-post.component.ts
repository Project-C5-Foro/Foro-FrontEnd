import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import { PostsResponse } from '@models/posts.model';
import { CategoryResponse } from '@models/category.model';
import { LoginResponse } from '@models/register.model';

import { PostsService } from '@core/posts.service';
import { CategoryService } from '@core/category.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  user: LoginResponse;
  posts: PostsResponse [] = [];
  categories: CategoryResponse [] = [];
  form: FormGroup;

  constructor(
    private postsService: PostsService,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService
  ) {
    this.buildForm();
  }
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;

  ngOnInit(): void {
    let userData: any = sessionStorage.getItem('user');
    userData = JSON.parse(userData);
    if (userData){
      this.user = userData.user;
    }
    this.fetchCategorys();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.fetchCategorys.prototype(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  fetchCategorys(): void{
    this.categoryService.getCategory()
    .subscribe( categories => {
      this.categories = categories;
    });
  }

  createPost(event: Event): void{
    event.preventDefault();
    if ( this.form.valid ) {
      const value = this.form.value;
      this.postsService.createPost(value)
      .subscribe(() => {
        console.log('exito');
      }, err => {
        console.error(err);
      });
    }else{
      console.error('err');
    }
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      user: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      title: ['', [Validators.required]],
      category: ['', [Validators.required]],
      post: ['', [Validators.required]]
    });
  }
}

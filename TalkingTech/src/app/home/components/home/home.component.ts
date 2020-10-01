import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

import { LoginResponse } from '@models/register.model';
import { CategoryResponse } from '@models/category.model';
import { PostsResponse } from '@models/posts.model';
import { CategoryService } from '@core/category.service';
import { PostsService } from '@core/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  myControl = new FormControl();
  filteredOptions: Observable<string[]>;

  user: LoginResponse;
  category: CategoryResponse [] = [];
  posts: PostsResponse [] = [];
  form: FormGroup;

  constructor(
    private categoryService: CategoryService,
    private postsService: PostsService,
    private formBuilder: FormBuilder,
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    let userData: any = sessionStorage.getItem('user');
    userData = JSON.parse(userData);
    if (userData){
      this.user = userData.user;
    }
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    this.fetchCategorys();
    this.fetchPosts();
  }

  fetchCategorys(): void{
    this.categoryService.getCategory()
    .subscribe( category => {
      this.category = category;
    });
  }
  fetchPosts(): void{
    this.postsService.getAllPosts()
    .subscribe( posts => {
      this.posts = posts;
    });
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.fetchCategorys.prototype(option => option.toLowerCase().indexOf(filterValue) === 0);
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
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      title: ['', [Validators.required]],
      category: ['', [Validators.required]],
      post: ['', [Validators.required]]
    });
  }

}

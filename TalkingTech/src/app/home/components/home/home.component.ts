import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { LoginResponse } from '@models/register.model';
import { CategoryResponse } from '@models/category.model';
import { PostsResponse } from '@models/posts.model';
import { CategoryService } from '@core/category.service';
import { PostsService } from '@core/posts.service';
import { Recommended } from '@models/posts-recommended.model';

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
  filterpost = '';
  categories: string[] = [];
  recommended: Recommended [] = [];
  constructor(
    private categoryService: CategoryService,
    private postsService: PostsService,
    private router: Router,
  ) {
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
    this.fetchPostsRecommended();
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
  fetchPostsRecommended(): void{
    this.postsService.getAllPostRecommended()
    .subscribe(recommended => {
      this.recommended = recommended;
    });
  }
  navigateCreate(): void{
    this.router.navigate(['home/create']);
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.categories.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
}

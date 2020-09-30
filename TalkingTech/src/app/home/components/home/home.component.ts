import { Component, OnInit } from '@angular/core';

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

  user: LoginResponse;
  category: CategoryResponse [] = [];
  posts: PostsResponse [] = [];

  constructor(
    private categoryService: CategoryService,
    private postsService: PostsService
  ) { }

  ngOnInit(): void {
    let userData: any = sessionStorage.getItem('user');
    userData = JSON.parse(userData);
    if (userData){
      this.user = userData.user;
    }
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

}

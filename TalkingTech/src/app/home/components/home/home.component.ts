import { Component, OnInit } from '@angular/core';

import { LoginResponse } from '@models/register.model';
import { CategoryResponse, Category } from '@models/category.model';

import { CategoryService } from '@core/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user: LoginResponse;
  category: CategoryResponse [] = [];

  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    let userData: any = sessionStorage.getItem('user');
    userData = JSON.parse(userData);
    if (userData){
      this.user = userData.user;
    }
    this.fetchCategorys();
  }

  fetchCategorys(): void{
    this.categoryService.getCategory()
    .subscribe( category => {
      this.category = category;
    });
  }

}

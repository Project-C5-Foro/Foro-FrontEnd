import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { PostsDetailComponent } from './components/posts-detail/posts-detail.component';

import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from '@material/material.module';

import { NgxSpinnerModule } from 'ngx-spinner';
import { CreatePostComponent } from './components/create-post/create-post.component';


@NgModule({
  declarations: [HomeComponent, PostsDetailComponent, CreatePostComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    MaterialModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class HomeModule { }

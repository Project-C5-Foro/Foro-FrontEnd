import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { PostsDetailComponent } from './components/posts-detail/posts-detail.component';
import { CreatePostComponent } from './components/create-post/create-post.component';

import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from '@material/material.module';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    HomeComponent,
    PostsDetailComponent,
    CreatePostComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    MaterialModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    FormsModule,
    SweetAlert2Module
  ]
})
export class HomeModule { }

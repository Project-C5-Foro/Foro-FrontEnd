import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { PostsDetailComponent } from './components/posts-detail/posts-detail.component';
import { CreatePostComponent } from './components/create-post/create-post.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'create',
    component: CreatePostComponent
  },
  {
    path: ':id',
    component: PostsDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

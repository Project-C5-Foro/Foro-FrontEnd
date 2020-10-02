import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { PostsDetailComponent } from './components/posts-detail/posts-detail.component';
import { CreatePostComponent } from './components/create-post/create-post.component';

import { AdminGuard } from '@utils/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'create',
    canActivate: [AdminGuard] ,
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

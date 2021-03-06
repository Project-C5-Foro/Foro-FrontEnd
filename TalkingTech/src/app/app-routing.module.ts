import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

import { AdminGuard } from '@utils/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: () => import ('./home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'profile',
        canActivate: [AdminGuard] ,
        loadChildren: () => import ('./profile/profile.module').then(m => m.ProfileModule)
      },
    ]
  },
  {
    path: '',
    loadChildren: () => import ('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '**',
    loadChildren: () => import ('./page-not-found/page-not-found.module').then(m => m.PageNotFoundModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules, useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

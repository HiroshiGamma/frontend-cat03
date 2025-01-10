import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { UserGuard } from './Auth/Guards/user.guard';

export const routes: Routes = [
 
  {
    path: 'login',
    loadComponent: () => import('../app/Auth/Pages/login-register/login-register.component').then(m => m.LoginRegisterComponent),
    pathMatch: 'full'
  },
  {
    path: 'general',
    loadComponent: () => import('../app/Post/Pages/general/general.component').then(m => m.GeneralComponent),
    canActivate: [UserGuard]
  },
  {
    path: 'view-post',
    loadComponent: () => import('../app/Post/Pages/view-post/view-post.component').then(m => m.ViewPostComponent),
    canActivate: [UserGuard]
  },
  {
    path: 'create-post',
    loadComponent: () => import('../app/Post/Pages/create-post/create-post.component').then(m => m.CreatePostComponent),
    canActivate: [UserGuard]
  },
  {
    path: '**',
    redirectTo: 'login',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

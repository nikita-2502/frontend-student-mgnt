import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuardGuard } from './shared/authGuard/auth-guard.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./auth/auth.module').then((mod) => mod.AuthModule),
  },
  {
    path: '',
    canActivate: [AuthGuardGuard],
    loadChildren: () =>
      import('./layout/layout.module').then((mod) => mod.LayoutModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./material/material.module').then((mod) => mod.MaterialModule),
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

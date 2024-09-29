import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '', redirectTo: 'dashboard', pathMatch: 'full'
      },
      {
        path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then((mod) => mod.DashboardModule)
      },
      {
        path: 'student', loadChildren: () => import('./student/student.module').then((mod) => mod.StudentModule)
      },
      {
        path: 'class', loadChildren: () => import('./classroom/classroom.module').then((mod) => mod.ClassroomModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }

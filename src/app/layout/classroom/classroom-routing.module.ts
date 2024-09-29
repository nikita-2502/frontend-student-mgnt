import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassListComponent } from './class-list/class-list.component';
import { ClassFormComponent } from './class-form/class-form.component';

const routes: Routes = [
  {path: 'list', component: ClassListComponent},
  {path: 'add', component: ClassFormComponent},
  {path: 'add/:id', component: ClassFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassroomRoutingModule { }

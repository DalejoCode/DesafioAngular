import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentsComponent } from './students.component';
import { EnrollComponent } from './components/enroll/enroll.component';
import { EnrollListComponent } from './components/enroll-list/enroll-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: StudentsComponent },
  { path: 'enroll', pathMatch: 'full', component: EnrollComponent },
  { path: 'enroll-list', pathMatch: 'full', component: EnrollListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }

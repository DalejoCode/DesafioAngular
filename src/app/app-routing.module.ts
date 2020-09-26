import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path:'', loadChildren:() => import('./modules/home/home.module').then(m => m.HomeModule) },
  { path: 'characters', loadChildren:() => import('./modules/characters/characters.module').then(m => m.CharactersModule) },
  { path: 'students', loadChildren:() => import('./modules/students/students.module').then(m => m.StudentsModule) },
  { path: 'staff', loadChildren:() => import('./modules/staff/staff.module').then(m => m.StaffModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

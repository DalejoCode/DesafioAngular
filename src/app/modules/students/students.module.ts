import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from '../students/students.component';
import { EnrollComponent } from './components/enroll/enroll.component';
import { EnrollListComponent } from './components/enroll-list/enroll-list.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [StudentsComponent, EnrollComponent, EnrollListComponent],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  entryComponents: [StudentsComponent]
})
export class StudentsModule { }

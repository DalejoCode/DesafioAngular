import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { Character } from 'src/app/core/models/character.model';

@Component({
  selector: 'app-enroll-list',
  templateUrl: './enroll-list.component.html',
  styleUrls: ['./enroll-list.component.css']
})
export class EnrollListComponent implements OnInit {

  public students: Character[];

  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.students = this.studentService.getEnrollList();
  }

  public get showTable(): boolean {
    return this.students && this.students.length > 0;
  }

}

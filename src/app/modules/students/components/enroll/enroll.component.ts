import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StudentService } from '../../services/student.service';
import { Router } from '@angular/router';
import { Character } from 'src/app/core/models/character.model';

@Component({
  selector: 'app-enroll',
  templateUrl: './enroll.component.html',
  styleUrls: ['./enroll.component.css']
})
export class EnrollComponent implements OnInit {
  public studentForm: FormGroup;
  private base64textString = "";

  constructor(private studentService: StudentService,
    private builder: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.doForm();
  }

  public submitRequest(): void {
    const element: HTMLInputElement = document.querySelector("#formImage");
    const image = this.getBase64Image(element);
    const student = new Character(
      this.studentForm.value['name'],
      this.studentForm.value['patronus'],
      this.studentForm.value['age'],
      image
    );
    this.studentService.enrollNewStudent(student);
    this.router.navigate(['/students/enroll-list']);
  }

  private doForm(): void {
    this.studentForm = this.builder.group({
      name: ['', Validators.required],
      patronus: ['', Validators.required],
      age: ['', Validators.required],
      image: ['', Validators.required]
    })
  }

  private getBase64Image(img: HTMLInputElement): string {
    let file = img.files[0];
    if (file) {
      var reader = new FileReader();
      reader.onload = this.handleFile.bind(this);
      reader.readAsBinaryString(file);
    }
    return this.base64textString ? this.base64textString.replace(/^data:image\/(png|jpg);base64,/, "") : null;
  }

  private handleFile(event) {
    const binaryString = event.target.result;
    this.base64textString= btoa(binaryString);
    console.log(btoa(binaryString));
   }

}

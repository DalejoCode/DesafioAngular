import { Component, OnInit } from '@angular/core';
import { Character } from 'src/app/core/models/character.model';
import { Subscription } from 'rxjs';
import { ResourceService } from 'src/app/core/services/resource/resource.service';
import { environment } from 'src/environments/environment';
import { StorageEnum } from 'src/app/core/enums/storage.enum';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  public isLoading: boolean = true;
  public students: Character[] = [];

  private componentSubscriptions: Subscription;

  constructor(private characterService: ResourceService) { }

  ngOnInit() {
    this.doSubscriptions();
  }

  public get showTable(): boolean {
    return this.students && this.students.length > 0;
  }

  private doSubscriptions(): void {
    this.componentSubscriptions = new Subscription();
    this.characterService.getCharacters(environment.api_students, StorageEnum.STUDENTS);
    this.componentSubscriptions.add(this.characterService.getCharactersRx().subscribe(response => {
      if(response != null) {
        this.isLoading = false;
        this.students = response;
      }
    }));
  }

  public getAgeInfo(age: number): string {
    return age ? age.toString() : 'Not registered'
  }

  ngOnDestroy(): void {
    this.componentSubscriptions.unsubscribe();
    this.characterService.cleanData();
  }
}

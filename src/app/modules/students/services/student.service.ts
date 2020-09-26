import { Injectable } from '@angular/core';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { Character } from 'src/app/core/models/character.model';
import { StorageEnum } from 'src/app/core/enums/storage.enum';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private storageService: StorageService) { }

  public getEnrollList(): Character[] {
    return this.storageService.get(StorageEnum.ENROLL) as Character[];
  }

  public enrollNewStudent(newStudent: Character): void {
    let enrollList = this.hasEnrolls() ? this.getEnrollList() : [];
    enrollList.push(newStudent);
    this.storageService.set(StorageEnum.ENROLL, enrollList);
  }

  private hasEnrolls(): boolean {
    return !!this.getEnrollList();
  }
}

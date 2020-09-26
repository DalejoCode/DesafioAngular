import { Component, OnInit, OnDestroy } from '@angular/core';
import { Character } from 'src/app/core/models/character.model';
import { ResourceService } from 'src/app/core/services/resource/resource.service';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageEnum } from 'src/app/core/enums/storage.enum';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit, OnDestroy {
  public isLoading: boolean = true;
  public staffMembers: Character[] = [];

  private componentSubscriptions: Subscription;

  constructor(private characterService: ResourceService) { }

  ngOnInit() {
    this.doSubscriptions();
  }

  public get showTable(): boolean {
    return this.staffMembers && this.staffMembers.length > 0;
  }

  private doSubscriptions(): void {
    this.componentSubscriptions = new Subscription();
    this.characterService.getCharacters(environment.api_staff, StorageEnum.STAFF);
    this.componentSubscriptions.add(this.characterService.getCharactersRx().subscribe(response => {
      if(response != null) {
        this.isLoading = false;
        this.staffMembers = response;
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

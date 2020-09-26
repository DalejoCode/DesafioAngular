import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ResourceService } from 'src/app/core/services/resource/resource.service';
import { Character } from 'src/app/core/models/character.model';
import { environment } from 'src/environments/environment';
import { StorageEnum } from 'src/app/core/enums/storage.enum';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit, OnDestroy {
  public isLoading: boolean = false;
  public houseForm: FormGroup;
  public characters: Character[] = [];

  private componentSubscriptions: Subscription;

  constructor(private characterService: ResourceService,
    private builder: FormBuilder) { }

  ngOnInit() {
    this.doForm();
    this.doSubscriptions();
  }

  public changeSchoolSelected(): void {
    this.isLoading = true;
    const house = this.houseForm.value['house'];
    this.characterService.getCharacters(environment.api_characters, StorageEnum.CHARACTERS, house);
  }

  private doForm(): void {
    this.houseForm = this.builder.group({
      house: ['']
    })
  }

  public get isHouseNotEmpty(): boolean {
    return this.houseForm && this.houseForm.value['house'];
  }

  public get showTable(): boolean {
    return this.characters && this.characters.length > 0;
  }

  private doSubscriptions(): void {
    this.componentSubscriptions = new Subscription();
    this.componentSubscriptions.add(this.characterService.getCharactersRx().subscribe(response => {
      if(response != null) {
        this.isLoading = false;
        this.characters = response;
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

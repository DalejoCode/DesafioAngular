import { Injectable } from '@angular/core';
import { HttpRequesterService } from 'src/app/core/services/http/http-requester.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { BehaviorSubject, Observable} from 'rxjs';
import { Character } from '../../models/character.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  private characterSubject: BehaviorSubject<Character[]>;

  constructor(private storageService: StorageService,
    private httpService: HttpRequesterService) {
      this.characterSubject = new BehaviorSubject<Character[]>(null);
  }

  public getCharacters(baseUrl: string, storageKey: string, house?: string): void {
    const key = house ? storageKey.concat(house) : storageKey;
    const localResource = this.storageService.get(key) as Character[];
    const url = house ? baseUrl.concat(house) : baseUrl;
    if(localResource) {
      this.characterSubject.next(localResource);
    } else {
      this.httpService
      .get(url)
      .pipe(map(response => this.mapResponse(response)))
      .subscribe(response => {
        this.characterSubject.next(response);
        this.storageService.set(key, response);
      });
    }
  }

  public getCharactersRx(): Observable<Character[]> {
    return this.characterSubject.asObservable();
  }

  private mapResponse(response: any[]): Character[] {
    let characters : Character[] = [];
    if(response && response.length > 0) {
      response.forEach(element => {
        const character = new Character(element.name, element.patronus, this.calculateAge(element.yearOfBirth), element.image);
        characters.push(character);
      });
    }

    return characters;
  }

  private calculateAge(yearOfBirth: number): number {
    const currentYear = new Date().getFullYear();
    return yearOfBirth ? currentYear - yearOfBirth : 0;
  }

  public cleanData(): void {
    this.characterSubject.next(null);
  }
}

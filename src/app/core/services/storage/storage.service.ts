import { Injectable, Inject } from '@angular/core';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(@Inject(LOCAL_STORAGE) private localStorage: WebStorageService) { }

  public set(key: string, value: any): void {
    this.localStorage.set(key, value);
  }

  public get(key: string): any {
    return this.localStorage.get(key);
  }

  public remove(key: string): void {
    this.localStorage.remove(key);
  }
}

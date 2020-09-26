import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HandleError } from '../../handlers/handle-error';

@Injectable({
  providedIn: 'root'
})
export class HttpRequesterService {

  constructor(private httpClient: HttpClient) { }

  public get(url: string): Observable<any> {
    return this.httpClient
      .get<any>(url)
      .pipe(catchError(HandleError<any>('getMethod', null)));
  }

  public post(url: string, args: any): Observable<any> {
    return this.httpClient
      .post<any>(url, args)
      .pipe(catchError(HandleError<any>('getMethod', null)));
  }

  public put(url: string, args: any): Observable<any> {
    return this.httpClient
      .put(url, args)
      .pipe(catchError(HandleError<any>('putMethod', null)));
  }

  public delete(url: string): Observable<any> {
    return this.httpClient
      .delete(url)
      .pipe(catchError(HandleError<any>('deleteMethod', null)));
  }
}

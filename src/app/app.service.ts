import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Nfl } from './nfl';


@Injectable()
export class NFLService {
  nflURL = 'http://www.nfl.com/liveupdate/scorestrip/ss.json';  // URL to web api

  constructor(
    private http: HttpClient)
    {  }

  /** GET NFLGames from the server */
  getNFLGames (): Observable<Nfl[]> {

    console.log("Beginning Service!");

    return this.http.get<Nfl[]>(this.nflURL)
      .pipe(
        catchError(this.handleError) // then handle the error
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
  
}
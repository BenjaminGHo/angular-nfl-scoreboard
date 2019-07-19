import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Nfl } from './nfl';

@Injectable()
export class NFLService {
  nflURL = 'http://www.nfl.com/liveupdate/scorestrip/ss.json';  // URL to web api
  gameURL = 'http://www.nfl.com/liveupdate/game-center/2018090905/2018090905_gtd.json';
  moreURL = 'http://www.nfl.com/ajax/scorestrip?season=2019&seasonType=PRE&week=1'
  immages ='https://www.bountysource.com/issues/3570617-link-to-images'
  /*
   http://static.nfl.com/static/content/public/static/img/getty/headshot/B/R/A/BRA371156.jpg
  http://static.nfl.com/static/content/public/static/img/getty/headshot/A/B/D/ABD647726.jpg
  ESB ID: ABD647726
	GSIS ID: 00-0032104*/

  constructor(
    private http: HttpClient
  ){}

  /** GET NFLGames from the server */
  getNFLGames (): Observable<Nfl[]> {

    console.log("Beginning Service!");

    return this.http.get<Nfl[]>(this.nflURL)
      .pipe(
        catchError(this.handleError) // then handle the error
      );
  }

  /** GET NFLGames from the server */
  getGame(): Observable<any[]> {

      console.log("Beginning Service!");
  
      return this.http.get<any[]>(this.gameURL)
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

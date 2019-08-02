import { Component } from '@angular/core';
import { NFLService } from './app.service';
import { Nfl } from './nfl';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'NFL Scoreboard';
  nfl: Nfl[];
  jsonReturnedBack: any
  gameReturnedBack: any
  scoringSummary: any
  games: any
  Object = Object

  constructor(
    private nflService: NFLService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.getNFLService();
    this.getGameService();

    /* https://jsonplaceholder.typicode.com/ */
    this.http.get('https://jsonplaceholder.typicode.com/todos/1').subscribe(data => {
      console.log(data);
    });


  }

  getNFLService(): void {
    this.nflService.getNFLGames()
    .subscribe(nflGames => {
      this.jsonReturnedBack = nflGames;
      this.games =  this.jsonReturnedBack.gms;
    });
  }

  getGameService(): void {
    this.nflService.getGame()
    .subscribe(gameInfo => {
      console.log(gameInfo);
      var firstKey = (Object.keys(gameInfo)[0]);
      // Step 2. Create an empty array.
      let keyList = Object.keys(gameInfo[firstKey]["drives"]);
      this.gameReturnedBack = [];
      // Step 3. Iterate throw all keys.
      for (var prop of keyList) { 
        if (prop != 'crntdrv')  // not sure why, but there is 'crntdrv' key at the end that displays number of drives
          this.gameReturnedBack.push(gameInfo[firstKey]["drives"][prop]);
      }

      keyList = Object.keys(gameInfo[firstKey]["scrsummary"]);

      this.scoringSummary = [];
      // Step 3. Iterate throw all keys.
      for (var prop of keyList) { 
        if (prop != 'crntdrv')  // not sure why, but there is 'crntdrv' key at the end that displays number of drives
          this.scoringSummary.push(gameInfo[firstKey]["scrsummary"][prop]);
      }
    });
  }
  
  trackElement(index: number, element: any) {
    //console.log(element);
    return element ? element.guid : null
  }

}
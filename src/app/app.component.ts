import { Component } from '@angular/core';
import { NFLService } from './app.service';
import { Nfl } from './nfl';

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
  games: any
  Object = Object

  constructor(private nflService: NFLService) {}

  ngOnInit() {
    this.getNFLService();
    this.getGameService();
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
      console.log("first key: " + firstKey);
      // Step 2. Create an empty array.
      let keyList = Object.keys(gameInfo[firstKey]["drives"]);
      console.log(keyList);
      this.gameReturnedBack = [];
      // Step 3. Iterate throw all keys.
      for (var prop of keyList) { 
        if (prop != 'crntdrv')  // not sure why, but there is 'crntdrv' key at the end that displays number of drives
          this.gameReturnedBack.push(gameInfo[firstKey]["drives"][prop]);
      }
    });
  }
}
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
      //console.log(nflGames);
    });
      //console.log("this is done!");
  }

  getGameService(): void {
    this.nflService.getGame()
    .subscribe(gameInfo => {
      console.log(gameInfo);
      var firstKey = (Object.keys(gameInfo)[0]);
      // Step 2. Create an empty array.
      let evilResponseProps = Object.keys(gameInfo[firstKey]["drives"]);
      //console.log(evilResponseProps);
      this.gameReturnedBack = [];
      // Step 3. Iterate throw all keys.

      for (var prop of evilResponseProps) { 
        this.gameReturnedBack.push(gameInfo[firstKey]["drives"][prop]);
      }
    });
      //console.log("this is done!");
  }
}
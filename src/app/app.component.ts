import { Component } from '@angular/core';
import { NFLService } from './app.service';
import { Nfl } from './nfl';

interface Course {
  url:"http://www.nfl.com/liveupdate/scorestrip/ss.json";
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'NFL Scoreboard - Angular';
  nfl: Nfl[];
  jsonReturnedBack: any
  games: any

  constructor(private nflService: NFLService) {}

  ngOnInit() {
    this.getNFLService();
  }

  getNFLService(): void {
    this.nflService.getNFLGames()
    .subscribe(nflGames => {
      this.jsonReturnedBack = nflGames;
      this.games =  this.jsonReturnedBack.gms;
      console.log(nflGames);
    });
      console.log("this is done!");
  }

 

}

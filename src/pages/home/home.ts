import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Island } from '../island/island';
import { Tile } from '../../app/models/tile';

import { IslandGenerator } from '../../app/services/islandgenerator';
import { GameService } from '../../app/services/gameservice';

@Component({
  selector: 'home',
  templateUrl: 'home.html'
})
export class Home {

  constructor(public navCtrl: NavController,
              public storage: Storage,
              public gameservice: GameService) {

    storage.get("gameservice").then((gs) => {
      if(gs === null) {
        gs = new GameService();
      }
      this.gameservice = gs;
      console.log("GS on home init", gs);
    });

  }


  startnewgame() {
    this.storage.remove('gameservice').then((thing) => {
      
      this.gameservice = new GameService();

      var islandgenerator = new IslandGenerator();

      var rowsControl = [0, 1, 2, 3, 4];
      var colsControl = [0, 1, 2, 3, 4];
      var gridObj = {};
      
      for(var row of rowsControl) {
        for(var col of colsControl) {
          if(row === 0 || row === 4 || col === 0 || col === 4) {
            gridObj[row+''+col] = islandgenerator.generatecoasttile(row, col);
          } else {
            gridObj[row+''+col] = islandgenerator.generatelandtile(row, col);
          }
        }
      }

      gridObj["22"] = new Tile("12", 2, 2, "hut", "The hut", []);
      gridObj["43"] = new Tile("23", 4, 3, "jetty", "The launch site",[]);
 
      this.storage.set("grid", gridObj);

      this.gameservice.gameon = true;
      this.storage.set("gameservice", this.gameservice);
    });
  }
    
  clearTurnTime() {
    console.log("nuking gameservice");
    
    this.storage.get('gameservice').then((gs) => {
      gs.gameon = false;
      this.storage.remove('gameservice');
    });

  }

  pushPage(){
    this.navCtrl.push(Island, {});
  }

  refresh(): void {
    window.location.reload();
  }

}

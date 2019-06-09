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

  constructor(public navCtrl: NavController, public storage: Storage) {
  
  }


  startnewgame() {
    this.storage.remove('gameservice').then((thing) => {
      this.storage.set("gameservice", new GameService());
      
      var islandgenerator = new IslandGenerator();

      var rowsControl = [0, 1, 2, 3, 4];
      var colsControl = [0, 1, 2, 3, 4];
      var gridObj = {};
      
      for(var row of rowsControl) {
        for(var col of colsControl) {
          if(row === 0 || row === 4 || col === 0 || col === 4) {
            console.log("coast");
            gridObj[row+''+col] = islandgenerator.generatecoasttile(row, col);
          } else {
            gridObj[row+''+col] = islandgenerator.generatelandtile(row, col);
          }
        }
      }

      gridObj["22"] = new Tile("12", 2, 2, "hut", []);
      gridObj["43"] = new Tile("23", 4, 3, "jetty", []);
 
      this.storage.set("grid", gridObj);
    });
  }

  pushPage(){
    this.navCtrl.push(Island, {});
  }

  refresh(): void {
    window.location.reload();
  }

}

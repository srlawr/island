import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Island } from '../island/island';
import { Tile } from '../../app/models/tile';

import { IslandGenerator } from '../../app/services/islandgenerator';

@Component({
  selector: 'home',
  templateUrl: 'home.html'
})
export class Home {

  constructor(public navCtrl: NavController, public storage: Storage) {
  
  }


  startnewgame() {
    this.storage.remove('turntime').then((thing) => {
      this.storage.set("turntime", 0);
      
      var islandgenerator = new IslandGenerator();

 
      this.storage.set("grid", { "00": islandgenerator.generatecoasttile(0, 0),
                            "01": islandgenerator.generatecoasttile(0, 1),
                            "02": islandgenerator.generatecoasttile(0, 2),
                            "03": islandgenerator.generatecoasttile(0, 3),
                            "04": islandgenerator.generatecoasttile(0, 4),
                        
                            "10": islandgenerator.generatecoasttile(1, 0),
                            "11": islandgenerator.generatelandtile(1, 1),
                            "12": islandgenerator.generatelandtile(1, 2),
                            "13": islandgenerator.generatelandtile(1, 3),
                            "14": islandgenerator.generatecoasttile(1, 4),

                            "20": islandgenerator.generatecoasttile(2, 0),
                            "21": islandgenerator.generatelandtile(2, 1),
                            "22": new Tile("12", 2, 2, "hut", []),
                            "23": islandgenerator.generatelandtile(2, 3),
                            "24": islandgenerator.generatecoasttile(2, 4),

                            "30": islandgenerator.generatecoasttile(3, 0),
                            "31": islandgenerator.generatelandtile(3, 1),
                            "32": islandgenerator.generatelandtile(3, 2),
                            "33": islandgenerator.generatelandtile(3, 3),
                            "34": islandgenerator.generatecoasttile(0, 4),

                            "40": islandgenerator.generatecoasttile(4, 0),
                            "41": islandgenerator.generatecoasttile(4, 1),
                            "42": islandgenerator.generatecoasttile(4, 2),
                            "43": new Tile("23", 4, 3, "jetty", []),
                            "44": islandgenerator.generatecoasttile(4, 4)
                          });
    });
  }

  clearTurnTime() {
    console.log("nuking turntime");
    this.storage.remove('turntime').then((thing) => {
      console.log("turn cleared");
      this.storage.get('turntime').then((tt) => {
        console.log(tt);
      });
    });

  }

  pushPage(){
    this.navCtrl.push(Island, {});
  }

  refresh(): void {
    window.location.reload();
  }

}

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
                            "01": new Tile("01", 0, 1, "beach", [ { item : "vine", qty : 8 } ]),
                            "02": new Tile("02", 0, 2, "beach", [ { item : "sand", qty : 1000 }, { item : "salt", qty : 1000 } ]),
                            "03": new Tile("03", 0, 3, "beach", [ { item : "wood", qty :3 } ]),
                            "04": new Tile("04", 0, 4, "beach", []),
                        
                            "10": new Tile("10", 1, 0, "beach", []),
                            "11": new Tile("11", 1, 1, "woods", []),
                            "12": new Tile("12", 1, 2, "woods", []),
                            "13": new Tile("13", 1, 3, "grass", []),
                            "14": new Tile("14", 1, 4, "cliffs", []),

                            "20": new Tile("10", 2, 0, "beach", []),
                            "21": new Tile("11", 2, 1, "woods", []),
                            "22": new Tile("12", 2, 2, "hut", []),
                            "23": new Tile("13", 2, 3, "water", []),
                            "24": new Tile("14", 2, 4, "beach", []),

                            "30": new Tile("15", 3, 0, "beach", []),
                            "31": new Tile("16", 3, 1, "woods", []),
                            "32": new Tile("17", 3, 2, "grass", []),
                            "33": new Tile("18", 3, 3, "water", []),
                            "34": new Tile("19", 3, 4, "beach", []),

                            "40": new Tile("20", 4, 0, "beach", []),
                            "41": new Tile("21", 4, 1, "beach", []),
                            "42": new Tile("22", 4, 2, "beach", []),
                            "43": new Tile("23", 4, 3, "jetty", []),
                            "44": new Tile("24", 5, 3, "beach", [])
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

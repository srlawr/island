import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Tile } from '../../app/models/tile';

import { Island } from '../island/island';

@Component({
  selector: 'home',
  templateUrl: 'home.html'
})
export class Home {

  constructor(public navCtrl: NavController, storage: Storage) {
    console.log("home.ts loaded");

    storage.set('grid', [ [ new Tile('00', 'beach', [ { item : 'wood', 'qty' : 2 }, { item : 'tinder', 'qty' : 5 } ]),
                            new Tile('01', 'beach', [ { item : 'vine', 'qty' : 8 } ]),
                            new Tile('02', 'beach', [ { item : 'sand', 'qty' : 1000 }, { item : 'salt', 'qty' : 1000 } ]),
                            new Tile('03', 'beach', [ { item : 'wood', 'qty' :3 } ]),
                            new Tile('04', 'beach', [])
                          ],
                          [
                            new Tile('05', 'beach', []),
                            new Tile('06', 'woods', []),
                            new Tile('07', 'woods', []),
                            new Tile('08', 'grass', []),
                            new Tile('09', 'beach', [])
                          ],
                          [
                            new Tile('10', 'beach', []),
                            new Tile('11', 'woods', []),
                            new Tile('12', 'hut', []),
                            new Tile('13', 'water', []),
                            new Tile('14', 'beach', [])
                          ],
                          [
                            new Tile('15', 'beach', []),
                            new Tile('16', 'woods', []),
                            new Tile('17', 'grass', []),
                            new Tile('18', 'water', []),
                            new Tile('19', 'beach', [])
                          ],
                          [
                            new Tile('20', 'beach', []),
                            new Tile('21', 'beach', []),
                            new Tile('22', 'beach', []),
                            new Tile('23', 'jetty', []),
                            new Tile('24', 'beach', [])
                         ]]
                         );

    storage.set("inventory", {});

  }

  pushPage(){
    // push another page onto the navigation stack
    // causing the nav controller to transition to the new page
    // optional data can also be passed to the pushed page.
    console.log("pushing page");
    this.navCtrl.push(Island, {});
  }

}

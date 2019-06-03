import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { Storage } from '@ionic/storage';

import { Tile } from '../app/models/tile';
import { Inventory } from '../app/models/inventory';
import { InventoryItem } from '../app/models/inventoryItem';
import { ItemAction } from '../app/models/itemAction';


import { Home } from '../pages/home/home';
import { ItemActionsPage } from '../pages/item-actions/item-actions';
//import { Island } from '../pages/island/island';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage:any = Home;
  // pages: Array<{title: string, component: any}>;

  constructor(platform: Platform, public screenOrientation: ScreenOrientation, public storage: Storage) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //statusBar.styleDefault();
      //splashScreen.hide();

      storage.get('turntime').then((turntime) => {
        console.log('turntime', turntime);
        if(turntime !== null) {

            // we are mid game....
            console.log("Game in progress", storage.get('turntime'), storage.get('grid'));

        } else {

          storage.set('turntime', 1);

          console.log("data setup");

          storage.set('grid', { "00": new Tile('00', 0, 0, 'beach', [ { item : 'wood', qty : 4 }, { item : 'tinder', qty : 5 }, { item : 'vine', qty : 3 } ]),
                                "01": new Tile('01', 0, 1, 'beach', [ { item : 'vine', qty : 8 } ]),
                                "02": new Tile('02', 0, 2, 'beach', [ { item : 'sand', qty : 1000 }, { item : 'salt', qty : 1000 } ]),
                                "03": new Tile('03', 0, 3, 'beach', [ { item : 'wood', qty :3 } ]),
                                "04": new Tile('04', 0, 4, 'beach', []),
                            
                                "10": new Tile('10', 1, 0, 'beach', []),
                                "11": new Tile('11', 1, 1, 'woods', []),
                                "12": new Tile('12', 1, 2, 'woods', []),
                                "13": new Tile('13', 1, 3, 'grass', []),
                                "14": new Tile('14', 1, 4, 'beach', []),

                                "20": new Tile('10', 2, 0, 'beach', []),
                                "21": new Tile('11', 2, 1, 'woods', []),
                                "22": new Tile('12', 2, 2, 'hut', []),
                                "23": new Tile('13', 2, 3, 'water', []),
                                "24": new Tile('14', 2, 4, 'beach', []),

                                "30": new Tile('15', 3, 0, 'beach', []),
                                "31": new Tile('16', 3, 1, 'woods', []),
                                "32": new Tile('17', 3, 2, 'grass', []),
                                "33": new Tile('18', 3, 3, 'water', []),
                                "34": new Tile('19', 3, 4, 'beach', []),

                                "40": new Tile('20', 4, 0, 'beach', []),
                                "41": new Tile('21', 4, 1, 'beach', []),
                                "42": new Tile('22', 4, 2, 'beach', []),
                                "43": new Tile('23', 4, 3, 'jetty', []),
                                "44": new Tile('24', 5, 3, 'beach', [])
                              });

          storage.set('itemactions', { 'wood' : [ new ItemAction('break',['tinder','tinder']) ],
                                       'vine' : [ new ItemAction('wrap', ['rope']) ]  
                                     }
                      );

          storage.set("inventory", new Inventory(new Array<InventoryItem>()));
        }

      });

      if (!platform.is('core')){
        // Mobile devices, hopefully?
        this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
      }
      else {
          //desktop browser only code
      }

    });

  }

}


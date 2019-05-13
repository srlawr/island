import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { Storage } from '@ionic/storage';

import { Tile } from '../app/models/tile';

import { Home } from '../pages/home/home';
//import { Island } from '../pages/island/island';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage:any = Home;
  // pages: Array<{title: string, component: any}>;

  constructor(platform: Platform, public screenOrientation: ScreenOrientation, storage: Storage) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //statusBar.styleDefault();
      //splashScreen.hide();
      console.log(this.screenOrientation.type);

      storage.set('grid', [ [ new Tile('00', 'beach', [ { item : 'wood', 'qty' : 3 }, { item : 'tinder', 'qty' : 5 } ]),
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
      
      console.log("data setup");

      if (!platform.is('core')){
        // Mobile devices, hopefully?
        this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
      }
      else {
          //desktop browser only code
      }

      console.log("App loaded in app.component.ts");
    });

    //this.pages = [
    //  { title: 'Home', component: HomePage },
    //  { title: 'Island View', component: Island }
    //];

  }
}


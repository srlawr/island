import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Island } from '../island/island';

@Component({
  selector: 'home',
  templateUrl: 'home.html'
})
export class Home {

  constructor(public navCtrl: NavController, public storage: Storage) {
  
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
    // push another page onto the navigation stack
    // causing the nav controller to transition to the new page
    // optional data can also be passed to the pushed page.
    this.navCtrl.push(Island, {});
  }

}

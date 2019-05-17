import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the TileModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inventory',
  templateUrl: 'inventory.html',
})

export class InventoryPage {

  private storage: any;
  private inventory: [];

  constructor(public navCtrl: NavController, 
              public viewCtrl : ViewController, 
              storage: Storage) {

    storage.get("inventory").then((inventory) => {
      this.inventory =  inventory;
      console.log(this.inventory);
    });

  }

  public closeModal(){
      this.viewCtrl.dismiss();
  }

}

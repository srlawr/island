import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Inventory } from '../../app/models/inventory';
import { InventoryItem } from '../../app/models/inventoryItem';
import { ItemDetailsPage } from '../item-details/item-details';

@IonicPage()
@Component({
  selector: 'page-inventory',
  templateUrl: 'inventory.html',
})

export class InventoryPage {

  private storage: any;
  public inventory: Inventory;

  constructor(public navCtrl: NavController, 
              public viewCtrl : ViewController, 
              storage: Storage) {

    this.inventory = new Inventory(new Array<InventoryItem>());
    this.storage = storage;

    storage.get("inventory").then((inventory) => {
      var invent = new Inventory(inventory.items);
      this.inventory = invent;
      console.log(this.inventory);
    });

  }

  public showItem(itemName : string) {
    this.navCtrl.push(ItemDetailsPage, { itemName : itemName });
  }

  public closeModal(){
      this.viewCtrl.dismiss();
  }

}

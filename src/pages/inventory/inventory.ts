import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Inventory } from '../../app/services/inventory';
import { InventoryItem } from '../../app/models/inventoryItem';
import { ItemDetailsPage } from '../item-details/item-details';

@IonicPage()
@Component({
  selector: 'page-inventory',
  templateUrl: 'inventory.html',
})

export class InventoryPage {

  private storage: any;

  constructor(public navCtrl: NavController, 
              public viewCtrl : ViewController, 
              storage: Storage,
              public inventory: Inventory) {

    this.storage = storage;

  }

  public showItem(itemName : string) {
    var itemQty = this.inventory.getQty(itemName);
    this.navCtrl.push(ItemDetailsPage, { itemName : itemName, itemQty : itemQty });
  }

  public closeModal(){
      this.viewCtrl.dismiss();
  }

}

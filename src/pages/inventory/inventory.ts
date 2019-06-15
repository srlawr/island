import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController } from 'ionic-angular';

import { Inventory } from '../../app/services/inventory';
import { GameService } from '../../app/services/gameservice';
import { ItemDetailsPage } from '../item-details/item-details';

@IonicPage()
@Component({
  selector: 'page-inventory',
  templateUrl: 'inventory.html',
})

export class InventoryPage {

  constructor(public navCtrl: NavController, 
              public viewCtrl : ViewController, 
              public inventory: Inventory,
              public gameservice: GameService) {

              inventory.items.sort(function( a, b ) {
                                        if ( a.item < b.item ){
                                          return -1;
                                        }
                                        if ( a.item > b.item ){
                                          return 1;
                                        }
                                        return 0;
                                      });
              console.log("its", inventory);
  }

  public showItem(itemName : string) {
    var itemQty = this.inventory.getQty(itemName);
    this.navCtrl.push(ItemDetailsPage, { itemName : itemName, itemQty : itemQty });
  }

  public closeModal(){
      this.viewCtrl.dismiss();
  }

}

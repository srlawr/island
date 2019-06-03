import { Component } from "@angular/core";
import { NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ItemAction } from '../../app/models/itemAction';
import { Inventory } from '../../app/models/inventory';


@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html'
})

export class ItemDetailsPage {

    public itemName : string;
    public itemQty : number;
    public actions : ItemAction[];
    public inventory : Inventory;

    constructor(public navParams : NavParams,
                public viewCtrl : ViewController,
                public storage : Storage) {

      this.itemName = this.navParams.get('itemName');
      this.itemQty = this.navParams.get('itemQty');

      storage.get('itemactions').then((actions) => {
        this.actions = actions[this.itemName];
      });

      storage.get('inventory').then((inventory) => {
        this.inventory = new Inventory(inventory.items);
      });

    }

    public closeModal(){
      this.viewCtrl.dismiss();
    }

    public doit(event, resource) {
      console.log("doing " + resource.actionname + " to " + this.itemName + "to get", resource.outcomes);
      this.inventory.removeOne(this.itemName);
      for(var eachOutcome of resource.outcomes) {
        this.inventory.addOne(eachOutcome);
      }
      this.storage.set("inventory", this.inventory);
    }

}
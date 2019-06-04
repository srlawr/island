import {Component} from "@angular/core";
import {NavController, NavParams} from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { TileModalPage } from '../tile-modal/tile-modal';
import { InventoryPage } from '../inventory/inventory';
import { Inventory } from '../../app/services/inventory';

@Component({
  selector: 'island',
  templateUrl: 'island.html'
})

export class Island {

  rowsControl: Number[];
  colsControl: Number[];

  selectedItem: any;
  island: {};

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              storage: Storage,
              public inventory: Inventory) {

    storage.get('grid').then((val) => {
      this.island = val;
      // don't set these until the island has been loaded to stop the grid trying to draw
      this.rowsControl = [0, 1, 2, 3, 4];
      this.colsControl = [0, 1, 2, 3, 4];
    });

    storage.get("inventory").then((inventory) => {
      this.inventory.setContents(inventory.items);
      console.log(this.inventory);
    });

    inventory.imhere();
  }

  tileTapped(event, tile) {
    console.log("You tapped " + tile.id);
    
  }

  public openTileModal(tile) { 
    this.navCtrl.push(TileModalPage, { tiledata : tile });
  }

  public showInventory() {
    this.navCtrl.push(InventoryPage, { });
  }

}
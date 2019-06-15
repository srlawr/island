import {Component} from "@angular/core";
import {NavController, NavParams} from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { TileModalPage } from '../tile-modal/tile-modal';
import { InventoryPage } from '../inventory/inventory';
import { JettyPage } from '../jetty/jetty';

import { Inventory } from '../../app/services/inventory';
import { GameService } from '../../app/services/gameservice';

@Component({
  selector: 'island',
  templateUrl: 'island.html'
})

export class Island {

  rowsControl: Number[];
  colsControl: Number[];

  selectedItem: any;
  island: {};

  public showIsland: boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public storage: Storage,
              public inventory: Inventory,
              public gameservice: GameService) {

    // find out why this provider doesn't survive the page change?!
    storage.get("gameservice").then((gs) => {
      this.gameservice = this.gameservice.reconsume(gs);
    })

    storage.get('grid').then((val) => {
      this.island = val;
      // don't set these until the island has been loaded to stop the grid trying to draw
      this.rowsControl = [0, 1, 2, 3, 4];
      this.colsControl = [0, 1, 2, 3, 4];
      this.showIsland = true;
    });

    storage.get("inventory").then((inventory) => {
      this.inventory.setContents(inventory.items);
      this.inventory.setItemBook(inventory.itemBook);
    });

  }

  public openTileModal(tile) { 

    if(tile.id != this.gameservice.lasttile) {
      this.gameservice.addtime(15);
      this.gameservice.lasttile = tile.id;
      this.storage.set("gameservice", this.gameservice);
    }

    if(tile.type === "jetty") {
      this.navCtrl.push(JettyPage, { });
    } else {
      this.navCtrl.push(TileModalPage, { tiledata : tile });
    }
  }

  public showInventory() {
    this.navCtrl.push(InventoryPage, { });
  }

}
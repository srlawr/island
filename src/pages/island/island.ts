import {Component} from "@angular/core";
import {NavController, NavParams} from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { TileModalPage } from '../tile-modal/tile-modal';
import { InventoryPage } from '../inventory/inventory';
import { ModalController } from 'ionic-angular';

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
              public modalCtrl : ModalController,
              storage: Storage) {

    storage.get('grid').then((val) => {
      this.island = val;
      // don't set these until the island has been loaded to stop the grid trying to draw
      this.rowsControl = [0, 1, 2, 3, 4];
      this.colsControl = [0, 1, 2, 3, 4];
    });

  }

  tileTapped(event, tile) {
    console.log("You tapped " + tile.id);
    
  }

  public openTileModal(tile) { 
    //var modalPage = this.modalCtrl.create(TileModalPage, { tiledata : tile });
    //modalPage.present();
    //console.log("pushing page");
    this.navCtrl.push(TileModalPage, { tiledata : tile });
  }

  public showInventory() {
    this.navCtrl.push(InventoryPage, { });
  }

}
import {Component} from "@angular/core";
import {NavController, NavParams} from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { TileModalPage } from '../tile-modal/tile-modal';
import { ModalController } from 'ionic-angular';

@Component({
  selector: 'island',
  templateUrl: 'island.html'
})

export class Island {
  selectedItem: any;
  island: string[][];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl : ModalController,
              storage: Storage) {
    console.log('Loading Island page');

    storage.get('grid').then((val) => {
      this.island = val;
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

}
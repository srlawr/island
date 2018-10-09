import {Component} from "@angular/core";
import {NavController, NavParams} from 'ionic-angular';

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
              public modalCtrl : ModalController) {
    console.log('Loading Island page');

    this.island = [ ['00','01','02','03','04'],
                    ['05','06','07','08','09'],
                    ['10','11','12','13','14'],
                    ['15','16','17','18','19'],
                    ['20','21','22','23','24']];
  }

  tileTapped(event, tile) {
    console.log("You tapped " + tile);
    
  }

  public openTileModal(tile) { 
    var modalPage = this.modalCtrl.create(TileModalPage, { tileid : tile });
    modalPage.present();
  }

}
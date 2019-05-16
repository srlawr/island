import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Tile } from '../../app/models/tile';
import { TileResource } from '../../app/models/tileResource';

/**
 * Generated class for the TileModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tile-modal',
  templateUrl: 'tile-modal.html',
})

export class TileModalPage {

  public grid: Tile[];
  public tiledata: Tile;
  private resources: {}[];
  private storage: any;

  constructor(public navCtrl: NavController, 
              public viewCtrl : ViewController, 
              public navParams: NavParams,
              storage: Storage) {

    storage.get("grid").then((loadedGrid) => {
      this.grid =  loadedGrid;
    });

    this.tiledata = this.navParams.get('tiledata');
    this.storage = storage;

    this.resources = this.tiledata.resources;

  }

  ionViewDidLoad() {
    console.log('We are on ', this.navParams.get('tiledata').type);
  }

  public pickup(event, resource) {

    console.log('Picked up', resource.item);

    if(resource.qty > 0) {
      this.storage.get('inventory').then((inventory) => {

        if(inventory[resource.item] === undefined) {
          inventory[resource.item] = 1;
        } else {
          inventory[resource.item] = inventory[resource.item] + 1;
        }
        resource.qty--;
        this.storage.set('inventory', inventory);
        this.storage.set('grid', this.grid);

        console.log(inventory);
      });
    }
  }

  public closeModal(){
      this.viewCtrl.dismiss();
  }

}

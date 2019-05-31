import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, NavParams } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { Tile } from '../../app/models/tile';
import { TileResource } from '../../app/models/tileResource';
import { Inventory } from '../../app/models/inventory';
import { InventoryPage } from '../inventory/inventory';


@IonicPage()
@Component({
  selector: 'page-tile-modal',
  templateUrl: 'tile-modal.html',
})

export class TileModalPage {

  public grid: {};
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
      this.storage.get('inventory').then((inventory: Inventory) => {
   
        var invent = new Inventory(inventory.items);
        
        invent.addOne(resource.item);
        resource.qty--;

        this.storage.set('inventory', invent);
        
        this.grid[this.tiledata.x+''+this.tiledata.y] = this.tiledata;
        this.storage.set('grid', this.grid);

        console.log(invent);
      });
    }
  }

  public showInventory() {
    this.navCtrl.push(InventoryPage);
  }

  public closeModal(){
    this.viewCtrl.dismiss();
  }

}

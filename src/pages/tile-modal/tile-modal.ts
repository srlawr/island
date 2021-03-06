import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, NavParams } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { Tile } from '../../app/models/tile';
import { TileResource } from '../../app/models/tileResource';
import { Inventory } from '../../app/services/inventory';
import { InventoryPage } from '../inventory/inventory';
import { InventoryPageModule } from '../inventory/inventory.module';
import { GameService } from '../../app/services/gameservice';


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
              storage: Storage,
              public inventory: Inventory,
              public gameservice: GameService) {

    storage.get("grid").then((loadedGrid) => {
      this.grid =  loadedGrid;
    });

    this.tiledata = this.navParams.get('tiledata');
    this.storage = storage;

    this.resources = this.inventory.tileresources(this.tiledata.resources);
  }

  ionViewDidLoad() {
    console.log('We are on ', this.navParams.get('tiledata').type);
  }

  public pickup(event, resource) {  
    if(resource.possiblecollect && resource.qty > 0) {
        console.log('Picked up', resource.item);

        this.inventory.addOne(resource.item);
        resource.qty--;

        this.gameservice.addtime(resource.playertime);

        this.storage.set("gameservice", this.gameservice);      
        this.storage.set('inventory', this.inventory);
        
        this.grid[this.tiledata.x+''+this.tiledata.y] = this.tiledata;
        this.storage.set('grid', this.grid);
    }
  }

  public showInventory() {
    this.navCtrl.push(InventoryPage);
  }

  public closeModal(){
    this.viewCtrl.dismiss();
  }

}

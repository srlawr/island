import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

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

  public tiledata;
  private resources: string[];

  constructor(public navCtrl: NavController, 
              public viewCtrl : ViewController, 
              public navParams: NavParams,
              storage: Storage) {

    this.tiledata = this.navParams.get('tiledata');

    storage.get('grid').then((val) => {
      this.resources = this.tiledata.resources;
      console.log('resource', this.resources);
    });

  }

  ionViewDidLoad() {
    console.log("We are on ", this.navParams.get('tileid'));
    
  }

  public pickup(event, resource) {
    console.log("Picked up", resource);

  }

  public closeModal(){
    this.viewCtrl.dismiss();
  }

}

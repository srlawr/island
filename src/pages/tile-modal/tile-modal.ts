import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, NavParams } from 'ionic-angular';

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

  public tileId;

  constructor(public navCtrl: NavController, public viewCtrl : ViewController, public navParams: NavParams) {
    this.tileId = this.navParams.get('tileid');
  }

  ionViewDidLoad() {
    console.log(this.navParams.get('tileid'));
  }

  public closeModal(){
    this.viewCtrl.dismiss();
  }

}

import { Component } from "@angular/core";
import { NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ItemAction } from '../../app/models/itemAction';


@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html'
})

export class ItemDetailsPage {

    public itemName : string;
    public actions : ItemAction[];

    constructor(public navParams : NavParams,
                public viewCtrl : ViewController,
                storage : Storage) {

      this.itemName = this.navParams.get('itemName');

      storage.get('itemactions').then((actions) => {
        this.actions = actions[this.itemName];
      });

    }

    public closeModal(){
      this.viewCtrl.dismiss();
    }

}
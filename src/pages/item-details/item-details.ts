import { Component } from "@angular/core";
import { NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ItemAction } from '../../app/models/itemAction';
import { Recipe } from '../../app/models/recipe';

import { Inventory } from '../../app/services/inventory';
import { Cookbook } from '../../app/services/cookbook';


@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html'
})

export class ItemDetailsPage {

    public itemName : string;
    public itemQty : number;
    public actions : ItemAction[];
    public recipes : Recipe[];

    constructor(public navParams : NavParams,
                public viewCtrl : ViewController,
                public storage : Storage,
                public inventory: Inventory) {

      this.itemName = this.navParams.get('itemName');
      this.itemQty = this.navParams.get('itemQty');

      storage.get('itemactions').then((actions) => {
        this.actions = actions[this.itemName];
      });

      storage.get("cookbook").then((cookbook: Cookbook) => {
        this.recipes = new Cookbook(cookbook.recipes).recipesForItem(this.itemName);
      });

    }

    public closeModal(){
      this.viewCtrl.dismiss();
    }

    public doit(event, resource) {
      console.log("doing " + resource.actionname + " to " + this.itemName + "to get", resource.outcomes);
      this.inventory.removeOne(this.itemName);
      this.itemQty--;
      for(var eachOutcome of resource.outcomes) {
        this.inventory.addOne(eachOutcome);

        // On the off chance the outcome is also what we are acting on?
        if(eachOutcome === this.itemName) {
          this.itemQty++;
        }

      }
      this.storage.set("inventory", this.inventory);
    }

    public cookit(event, resource) {
      console.log("execute recipe " + resource.recipeName);
      for(var thisIngredient of resource.ingredients) {
        this.inventory.removeOne(thisIngredient);

        // Adjust the qty count for displaying on this page as well
        if(thisIngredient === this.itemName) {
          this.itemQty--;
        }

      }

      for(var eachOutcome of resource.outcomes) {
        this.inventory.addOne(eachOutcome);
        
        // On the off chance the outcome is also what we are acting on!
        if(eachOutcome === this.itemName) {
          this.itemQty++;
        }

      }
      this.storage.set("inventory", this.inventory);
    }

}
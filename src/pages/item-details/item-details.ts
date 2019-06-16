import { Component } from "@angular/core";
import { NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ItemAction } from '../../app/models/itemAction';
import { Recipe } from '../../app/models/recipe';

import { Inventory } from '../../app/services/inventory';
import { Cookbook } from '../../app/services/cookbook';
import { GameService } from '../../app/services/gameservice';


@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html'
})

export class ItemDetailsPage {

    public itemName : string;
    public itemQty : number;
    public itemDescription : string;
    public actions : ItemAction[];
    public recipes : Recipe[];

    public cookbook : Cookbook;

    constructor(public navParams : NavParams,
                public viewCtrl : ViewController,
                public storage : Storage,
                public inventory: Inventory,
                public gameservice: GameService) {

      this.itemName = this.navParams.get('itemName');
      this.itemQty = this.navParams.get('itemQty');
      this.itemDescription = inventory.getDescription(this.itemName);

      storage.get("cookbook").then((cookbook: Cookbook) => {
        this.cookbook = new Cookbook(cookbook.recipes);
        this.recipes = this.cookbook.viableRecipesForItem(this.itemName, this.inventory);
        
        storage.get('itemactions').then((actions) => {
          // add inventory method to add actual processing time (and NaN if impossible?)
          if(actions[this.itemName] !== undefined) {
            this.actions = this.inventory.processedactionsforinventory(actions[this.itemName]);
          }
        });

      });
    

    }

    public closeModal(){
      this.viewCtrl.dismiss();
    }

    public doit(event, resource) {
      console.log("doing " + resource.actionname + " to " + this.itemName + " to get", resource.outcomes, this.inventory.getQty(resource.itemName));
      
      if(resource.possibleaction &&  this.itemQty > 0) {
        this.inventory.removeOne(this.itemName);
        this.itemQty--;
        for(var eachOutcome of resource.outcomes) {
          this.inventory.addOne(eachOutcome);

          // On the off chance the outcome is also what we are acting on?
          if(eachOutcome === this.itemName) {
            this.itemQty++;
          }

        }

        // re-evaluate valid recipes
        this.recipes = this.cookbook.viableRecipesForItem(this.itemName, this.inventory);

        // progress the game clock
        this.gameservice.addtime(resource.playertime);

        this.storage.set("gameservice", this.gameservice);
        this.storage.set("inventory", this.inventory);
      } else {
        console.log("Can't do that");
      }
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
      // re-evaluate valid recipes
      this.recipes = this.cookbook.viableRecipesForItem(this.itemName, this.inventory);

      // save the new inventory contents
      this.storage.set("inventory", this.inventory);
    }

}
import {Component} from "@angular/core";
import {NavController, NavParams, ViewController} from 'ionic-angular';

import { RaftBuildAction } from "../../app/models/raftBuildAction";
import { Inventory } from '../../app/services/inventory';
import { Storage } from '@ionic/storage';

import { RaftBuilder } from "../../app/services/raftbuilder";
import { Raft } from "../../app/models/raft";

@Component({
  selector: 'jetty',
  templateUrl: 'jetty.html'
})
export class JettyPage {
  
  public raftbuilder : RaftBuilder;
  public raftbuildactions: RaftBuildAction[];

  constructor(public navCtrl: NavController, 
              public viewCtrl : ViewController, 
              public navParams: NavParams,
              public storage: Storage,
              public inventory: Inventory) {

              storage.get("raftbuildactions").then((actions) => {
                storage.get("raft").then((raft) => {
                  this.raftbuilder = new RaftBuilder(raft, actions);
                  this.raftbuildactions = this.raftbuilder.viableActions(inventory);
                });
              });
              

              }
    
  public closeModal(){
    this.viewCtrl.dismiss();
  }

  public doit(event, resource) {

    for(var thisIngredient of resource.ingredients) {
        this.inventory.removeOne(thisIngredient);

        this.raftbuilder.build(thisIngredient);
        if(thisIngredient === 'log') {
          var biggerboat = this.raftbuilder.addlog();
          if(!biggerboat) {
            // @TODO 
            // handle the too many logs error/message here
          }
        }
      }

      this.raftbuilder.addstats(resource.stability, resource.carrycapacity);

      // re-evaluate valid recipes
      this.raftbuildactions = this.raftbuilder.viableActions(this.inventory);

      // save the new inventory contents
      this.storage.set("inventory", this.inventory);
      this.storage.set("raft", this.raftbuilder.raft);      
  }

}
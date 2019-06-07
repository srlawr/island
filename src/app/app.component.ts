import { Component } from "@angular/core";
import { Platform } from "ionic-angular";
import { ScreenOrientation } from "@ionic-native/screen-orientation/ngx";
import { Storage } from "@ionic/storage";

import { Tile } from "../app/models/tile";
import { Inventory } from "../app/services/inventory";
import { ItemAction } from "../app/models/itemAction";

import { Home } from "../pages/home/home";

import { Cookbook } from "./services/cookbook";
import { Recipe } from "./models/recipe";
import { InventoryPageModule } from "../pages/inventory/inventory.module";
import { RaftBuildAction } from "./models/raftBuildAction";
import { Raft } from "./models/raft";

@Component({
  templateUrl: "app.html"
})

export class MyApp {
  rootPage:any = Home;
  // pages: Array<{title: string, component: any}>;

  constructor(platform: Platform, public screenOrientation: ScreenOrientation, public storage: Storage) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //statusBar.styleDefault();
      //splashScreen.hide();

      storage.get("turntime").then((turntime) => {
        console.log("turntime", turntime);
        if(turntime !== null) {

            // we are mid game....
            console.log("Game in progress", storage.get("turntime"), storage.get("grid"));

        } else {

          storage.set("turntime", 1);

          console.log("data setup");

          var itemBook = { "wood" : { "description" : "This is a very useful, broad collection of wood. It can be burnt (once added to a firepit) or bound, broken and combined with any number of other things to make useful tools and artifacts." },
                           "vine" : { "description" : "Whether traditional ivy, or incredible Knot Weed, a fistful of vines can be turned into a number of useful ingredients." },
                           "log" : { "description" : "The cornerstone of raftbuilding really, a solid, floating tube of wood." },
                           "rope" : { "description" : "The most versitile binding ingredient in the world. Tie things up, tie things down, tie things together. The choice is yours!"},
                           "twine" : { "description" : "A finer, more specific version of rope, useful for crafting smaller items" },
                           "tinder" : { "description" : "A few fistfuls of only the driest, most flammable stuff. Essential to starting a fire."}
                          };

          storage.set("itembook", itemBook);

          storage.set("itemactions", { "wood" : [ new ItemAction("break", ["tinder","tinder"]) ],
                                       "vine" : [ new ItemAction("wrap",  ["rope"]), 
                                                  new ItemAction("dry", ["twine", "twine"]) ],
                                       "log"  : [ new ItemAction("smash", ["wood","wood","tinder"] ) ],
                                       "rope" : [ new ItemAction("split", ["twine", "twine"] ) ]
                                     }
                      );

          var inventory = new Inventory();
          inventory.setItemBook(itemBook);
          inventory.addOne("log");
          inventory.addOne("rope");
          storage.set("inventory", inventory);

          storage.set("raft", new Raft());

          var recipes = new Array<Recipe>();

          recipes.push(new Recipe("bind", ["wood", "wood","rope"], ["log"]));
          recipes.push(new Recipe("bind", ["twine", "twine", "twine"], ["rope"]));

          storage.set("cookbook", new Cookbook(recipes));

          storage.set("raftbuildactions", [new RaftBuildAction("Bind logs",  ["log", "rope"], 10,  3),
                                           new RaftBuildAction("Reinforce bindings", ["rope","rope"], 5, 0)
                                          ]
                      );

        }

      });

      if (!platform.is("core")){
        // Mobile devices, hopefully?
        this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
      }
      else {
          //desktop browser only code
      }

    });

  }

}

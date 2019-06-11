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
import { GameService } from "./services/gameservice";

@Component({
  templateUrl: "app.html"
})

export class MyApp {
  rootPage:any = Home;
  // pages: Array<{title: string, component: any}>;

  constructor(platform: Platform,
              public screenOrientation: ScreenOrientation, 
              public storage: Storage) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //statusBar.styleDefault();
      //splashScreen.hide();
      storage.get("gameservice").then((gameservice) => {
        
        console.log("app gs", gameservice);
        // First time the server/db/game is spun up!
        if (gameservice === null) {
          gameservice = new GameService();
          storage.set("gameservice", gameservice);
        }

        if(gameservice.gameon) {

            // we are mid game....
            console.log("Game in progress", storage.get("turntime"), storage.get("grid"));

        } else {

          console.log("data setup");

          var itemBook = { "wood" : { basecollect : 20, "description" : "This is a very useful, broad collection of wood. It can be burnt (once added to a firepit) or bound, broken and combined with any number of other things to make useful tools and artifacts." },
                           "vine" : { basecollect : 25, "description" : "Whether traditional ivy, or incredible Knot Weed, a fistful of vines can be turned into a number of useful ingredients." },
                           "log" : { basecollect: 90, "description" : "The cornerstone of raftbuilding really, a solid, floating tube of wood. Just don't expect to fell a tree quickly, or with your bare hands." },
                           "rope" : { basecollect: 5, "description" : "The most versitile binding ingredient in the world. Tie things up, tie things down, tie things together. The choice is yours!"},
                           "twine" : { basecollect: 2, "description" : "A finer, more specific version of rope, useful for crafting smaller items" },
                           "tinder" : { basecollect: 5,  "description" : "A few fistfuls of only the driest, most flammable stuff. Essential to starting a fire."},
                           "long grass" : { basecollect: 15, "description" : "" },
                           "clay" : { basecollect: 25, "description" : "" },
                           "scrap metal" : { basecollect: 10, "description" : "Some rough edged, worked metal." },
                           "rough axe" : { basecollect: 0, "description" : "A crude chopping device, should make reasonable work of cutting trees and other foilage." },                           
                           "rock" : { basecollect: 5, "description" : "A large piece of rock, seperated from the earth to become it's own entity. Good for bashing and reshaping things." },
                           "" : { basecollect: 0, "description" : "" }
                          };

          storage.set("itembook", itemBook);

          storage.set("itemactions", { "wood" : [ new ItemAction("break", ["tinder","tinder"], 15) ],
                                       "vine" : [ new ItemAction("wrap",  ["rope"], 60), 
                                                  new ItemAction("dry", ["twine", "twine"], 60) ],
                                       "log"  : [ new ItemAction("smash", ["wood","wood","tinder"], 120 ) ],
                                       "rope" : [ new ItemAction("split", ["twine", "twine"], 30 ) ],
                                       "long grass" : [ new ItemAction("plait", ["rope"], 60 ) ],
                                       "rough axe" : [ new ItemAction("dismantle", ["wood", "scrap metal", "tinder"], 45 ) ]
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
          recipes.push(new Recipe("build", ["wood", "scrap metal","twine"], ["rough axe"]));
          recipes.push(new Recipe("bind", ["twine", "twine", "twine"], ["rope"]));
          recipes.push(new Recipe("sharpen", ["rough axe", "rock"], ["sharp axe"]));

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

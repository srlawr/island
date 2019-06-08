import { Tile } from '../models/tile';


export class IslandGenerator {

    private landarray: string[];
    private coastarray: string[];

    private easyland: {} = { "woods" : 40, "grass" : 40, "water" : 20 };
    private easycoast: {} = { "beach" : 90, "cliffs" : 10};

    private landitems: {} = {"woods" : [ { "item" : "log", "chance" : 100, "min" : 3, "max" : 6 },
                                         { "item" : "wood", "chance" : 100, "min" : 1, "max" : 6 },
                                         { "item" : "vine", "chance" : 50, "min" : 0, "max" : 3 },
                                         { "item" : "tinder", "chance" : 75, "min" : 1, "max" : 6 } ],
                             "grass" : [ { "item" : "wood", "chance" : 80, "min" : 0, "max" : 2 },
                                         { "item" : "long grass", "chance" : 100, "min" : 0, "max" : 3 },
                                         { "item" : "clay", "chance" : 50, "min" : 1, "max" : 2 },
                                         { "item" : "tinder", "chance" : 75, "min" : 1, "max" : 6 } ],
                             "water" : [ { "item" : "clay", "chance" : 50, "min" : 1, "max" : 6 },
                                         { "item" : "long grass", "chance" : 50, "min" : 1, "max" : 2 } ],                                         
                           };

    private coastitems: {} = {"beach" : [ {"item" : "wood", "chance" : 50, "min" : 1, "max" : 2} ],
                              "cliffs" : [ {"item" : "rock", "chance" : 100, "min" : 1, "max" : 10} ]
                             };

    constructor() {
        this.landarray = new Array<string>();
        this.coastarray = new Array<string>();
        var count: number = 0;

        for(var property in this.easyland) {
            for(var clicker = 0; clicker < this.easyland[property]; clicker++) {
                this.landarray.push(property);
            }
        }
        for(var property in this.easycoast) {
            for(var clicker = 0; clicker < this.easycoast[property]; clicker++) {
                this.coastarray.push(property);
            }
        }
    }

    public generatelandtile(x: number, y: number): Tile {
        var landtype = this.landarray[Math.floor(Math.random() * Math.floor(100))];
        var tileinventory = [];
        for(var thisitem of this.landitems[landtype]) {
            if((Math.random() * 100) < thisitem.chance) {
                var qty = Math.floor(Math.random() * (thisitem.max+1 - thisitem.min) + thisitem.min);
                if(qty > 0) {
                    tileinventory.push({ item : thisitem.item, qty : qty});
                }
            }
        }
        return new Tile(x+''+y, x, y, landtype, tileinventory);
    }

    public generatecoasttile(x: number, y: number): Tile {
        var coasttype = this.coastarray[Math.floor(Math.random() * Math.floor(100))];
        var tileinventory = [];
        for(var thisitem of this.landitems[coasttype]) {
            if((Math.random() * 100) < thisitem.chance) {
                var qty = Math.floor(Math.random() * (thisitem.max+1 - thisitem.min) + thisitem.min);
                if(qty > 0) {
                    tileinventory.push({ item : thisitem.item, qty : qty});
                }
            }
        }
        return new Tile(x+''+y, x, y, coasttype, tileinventory );
    }

}
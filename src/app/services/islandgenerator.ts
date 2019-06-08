import { Tile } from '../models/tile';


export class IslandGenerator {

    private landarray: string[];
    private coastarray: string[];

    private easyland: {} = { "woods" : 40, "grass" : 40, "water" : 20 };
    private easycoast: {} = { "beach" : 90, "cliffs" : 10};

    constructor() {
        this.landarray = new Array<string>();
        this.coastarray = new Array<string>();
        var count: number = 0;

        for(var property in this.easyland) {
            for(var clicker = 0; clicker < this.easyland[property]; clicker++) {
                this.landarray.push(property);
                console.log(property);
            }
        }
        for(var property in this.easycoast) {
            for(var clicker = 0; clicker < this.easycoast[property]; clicker++) {
                this.coastarray.push(property);
                console.log(property);
            }
        }
        console.log(this.landarray[Math.floor(Math.random() * Math.floor(100))]);
        console.log(this.coastarray[Math.floor(Math.random() * Math.floor(100))]);
    }

    public generatelandtile(x: number, y: number): Tile {
        var landtype = this.landarray[Math.floor(Math.random() * Math.floor(100))];
        return new Tile(x+''+y, x, y, landtype, [ { item : "log", qty : 4 }, { item : "tinder", qty : 5 }, { item : "rope", qty : 3 } ]);
    }

    public generatecoasttile(x: number, y: number): Tile {
        var coasttype = this.coastarray[Math.floor(Math.random() * Math.floor(100))];
        return new Tile(x+''+y, x, y, coasttype, [ { item : "log", qty : 4 }, { item : "tinder", qty : 5 }, { item : "rope", qty : 3 } ]);
    }

}
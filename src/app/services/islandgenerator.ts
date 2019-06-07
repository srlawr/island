import { Tile } from '../models/tile';


export class IslandGenerator {

    constructor() {
    }


    public generatecoasttile(x: number, y: number): Tile {

        return new Tile(x+''+y, x, y, 'beach',  [ { item : "log", qty : 4 }, { item : "tinder", qty : 5 }, { item : "rope", qty : 3 } ]);
    }

}
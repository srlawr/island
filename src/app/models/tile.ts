import { TileResource } from './tileResource';

export class Tile {

    constructor(public id: string, public x: number, public y: number,
                public type: string, public resources: TileResource[]) {

    }

}
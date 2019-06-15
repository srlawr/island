export class TileResource {

    public playertime: number;
    public besttool: string;
    public possiblecollect: boolean;

    constructor(public item: string, public qty: number ){
        this.possiblecollect = false;
    }

}
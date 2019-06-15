export class ItemAction {

    public playertime: number;
    public besttool: string;
    public possibleaction: boolean;

    constructor(public actionname: string, public outcomes: string[], public basetime: number,
                public tooling: {}) {
        
        this.possibleaction = false;
    }

}
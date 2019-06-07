import { RaftBuildAction } from '../models/raftbuildaction';
import { Raft } from '../models/raft';
import { Inventory } from './inventory';

export class RaftBuilder {

    constructor(public raft: Raft, public buildactions: RaftBuildAction[]) {
        this.raft = raft;
    }

    public build(item: string) {
        this.raft.materials.push(item);
    }

    public addlog(): boolean {
        if(this.raft.logbuild < 10) {
            this.raft.logbuild++;
            return true;
        }
        return false;
    }

    public addstats(stability: number, carrycapacity: number) {
        this.raft.stability += stability;
        this.raft.carrycapacity += carrycapacity;
    }

    public viableActions(inventory: Inventory): RaftBuildAction[] {
        var validActions = new Array<RaftBuildAction>();

        for(var thisAction of this.buildactions) {

                // Summarise the ingredients
                var ingredientMap = {};
                for(var eachOne of thisAction.ingredients) {
                    if(ingredientMap[eachOne] === undefined) {
                        ingredientMap[eachOne] = 0;
                    }
                    ingredientMap[eachOne]++;
                }

                // Check the ingredient levels against the inventory
                var gotEverything: boolean = true;
                for(var thisCheck of Object.keys(ingredientMap)) {
                    if(ingredientMap[thisCheck] > inventory.getQty(thisCheck)) {
                        gotEverything = false;
                    }
                }
                // if we can cook it, return it
                if(gotEverything) {
                    validActions.push(thisAction);
                }

        }

        return validActions;
    }

}
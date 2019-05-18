import { InventoryItem } from './inventoryItem';

export class Inventory {

    constructor(public items: InventoryItem[]){

    }

    public addOne(item: string): void {

        let existed: boolean;
        existed = false;

        for(let thisItem of this.items) {
            if(thisItem.item === item) {
                existed = true;
                thisItem.qty++;
            }
        }
        if(!existed) {
            this.items.push(new InventoryItem(item, 1));
        }

    }

}
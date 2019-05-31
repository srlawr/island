import { InventoryItem } from './inventoryItem';

export class Inventory {

    public items: InventoryItem[];

    constructor(items: InventoryItem[]){
        this.items = items;
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
import { InventoryItem } from './inventoryItem';

export class Inventory {

    public items: InventoryItem[];

    constructor(items: InventoryItem[]){
        this.items = items;
    }

    public getQty(item: string): number {
        for(let thisItem of this.items) {
            if(thisItem.item === item) {
                return thisItem.qty;
            }
        }
        return 0;
    }

    public removeOne(item: string): void {
        for(let thisItem of this.items) {
            if(thisItem.item === item) {
                thisItem.qty--;
            }
        }
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
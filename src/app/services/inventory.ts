import { InventoryItem } from '../models/inventoryItem';
import { Injectable } from '@angular/core';

@Injectable()
export class Inventory {

    public items: InventoryItem[];
    public itemBook: {};

    constructor(itemBook: {}){ 
        this.items = new Array<InventoryItem>();
        this.itemBook = itemBook;
    }

    public setContents(items: InventoryItem[]) {
        this.items = items;
    }

    public getQty(item: string): number {
        for(var thisItem of this.items) {
            if(thisItem.item === item) {
                return thisItem.qty;
            }
        }
        return 0;
    }

    public getDescription(item: string): string {
        return this.itemBook[item].description;
    }

    public removeOne(item: string): void {
        for(var thisItem of this.items) {
            if(thisItem.item === item) {
                thisItem.qty--;
            }
        }
    }

    public addOne(item: string): void {
        var existed: boolean;
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
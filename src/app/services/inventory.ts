import { InventoryItem } from '../models/inventoryItem';
import { Injectable } from '@angular/core';
import { TileResource } from '../models/tileResource';

@Injectable()
export class Inventory {

    public items: InventoryItem[];
    public itemBook: {};

    constructor(){ 
        this.items = new Array<InventoryItem>();
    }

    public setContents(items: InventoryItem[]) {
        this.items = items;
    }

    /* @TODO not over the moon with this having to be set */
    public setItemBook(itemBook: {}) {
        this.itemBook = itemBook;
    }

    public getQty(item: string): number {
        for(var thisItem of this.items) {
            if(thisItem.item === item) {
                return thisItem.qty;
            }
        }
        return 0;
    }

    public getitemdetails(item: string): any {
        return this.itemBook[item];
    }

    public tileresources(items: TileResource[]): {}[] {

        for(var thisitem of items) {
            Object.assign(thisitem, this.getitemdetails(thisitem.item));
        }

        return items;
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
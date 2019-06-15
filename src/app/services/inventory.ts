import { InventoryItem } from '../models/inventoryItem';
import { ItemAction } from '../models/itemAction';
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

        // take a player inventory and work out tooling here.
        for(var thisitem of items) {
            // set the base time to the "hand time"
            thisitem['playertime'] = thisitem['basecollect'];
            for(var thistool in thisitem['tooling']) {
                if(thistool === "hand" && !thisitem.possiblecollect) {
                    thisitem.possiblecollect = true;
                    thisitem['besttool'] = "By Hand"; 
                }
                for(var eachtool of this.items) {
                    if(thistool === eachtool.item) {
                        // if we matched the tool, and it is a better time, apply the modifier and mark as possible
                        thisitem.possiblecollect = true;
                        if(Math.ceil(thisitem['basecollect'] * thisitem['tooling'][thistool]) < thisitem['playertime']) {
                            thisitem['besttool'] = "With " + thistool; 
                            thisitem['playertime'] = Math.ceil(thisitem['basecollect'] * thisitem['tooling'][thistool]);
                        }
                    }
                }
            }
        }

        return items;
    }
    
    public getDescription(item: string): string {
        return this.itemBook[item].description;
    }

    public processedactionsforinventory(actions: ItemAction[]): ItemAction[] {
        for(var thisaction of actions) {
            // set the base time to the "hand time"
            thisaction.playertime = thisaction.basetime;
            for(var thistool in thisaction.tooling) {
                if(thistool === "hand" && !thisaction.possibleaction) {
                    thisaction.possibleaction = true;
                    thisaction.besttool = "By Hand"; 
                }
                for(var eachtool of this.items) {
                    if(thistool === eachtool.item) {
                        // if we matched the tool, and it is a better time, apply the modifier and mark as possible
                        thisaction.possibleaction = true;
                        if(Math.ceil(thisaction.basetime * thisaction.tooling[thistool]) < thisaction.playertime) {
                            thisaction.besttool = "With " + thistool; 
                            thisaction.playertime = Math.ceil(thisaction.basetime * thisaction.tooling[thistool]);
                        }
                    }
                }
            }
        }
        return actions;
    }

    public removeOne(item: string): void {
        for(var thisItem of this.items) {
            if(thisItem.item === item) {
                thisItem.qty--;
            }
        }
        this.items = this.items.filter(function(thisitem) {
            return thisitem.qty > 0;
        });
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
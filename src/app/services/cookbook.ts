import { Recipe } from '../models/recipe';
import { Inventory } from './inventory';

export class Cookbook {

    constructor(public recipes: Recipe[]) {
    }

    public viableRecipesForItem(item: string, inventory: Inventory): Recipe[] {
        var validRecipes = new Array<Recipe>();

        for(var thisRecipe of this.recipes) {
            if(thisRecipe.ingredients.includes(item)) {

                // Summarise the ingredients
                var ingredientMap = {};
                for(var eachOne of thisRecipe.ingredients) {
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
                    validRecipes.push(thisRecipe);
                }

            }
        }

        return validRecipes;
    }

}
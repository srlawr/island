import { Recipe } from '../models/recipe';

export class Cookbook {

    constructor(public recipes: Recipe[]) {

    }

    public recipesForItem(item: string): Recipe[] {
        var validRecipes = new Array<Recipe>();

        for(var thisRecipe of this.recipes) {
            if(thisRecipe.ingredients.includes(item)) {
                validRecipes.push(thisRecipe);
            }
        }

        return validRecipes;
    }

}
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  recipeSelected = new EventEmitter<Recipe>();

  constructor(private shoppingListService: ShoppingListService) {}

  private recipes: Recipe[] = [
    new Recipe(
      'Yummy Steak',
      'Get in my mouth.',
      'https://images.pexels.com/photos/65175/pexels-photo-65175.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1.jpg',
      [
        new Ingredient('8oz steak', 1),
        new Ingredient('Green leaf thing', 1),
        new Ingredient('Red pepper', 3),
      ]
    ),
    new Recipe(
      'Is that bacon?',
      'Yes.',
      'https://images.pexels.com/photos/1927377/pexels-photo-1927377.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1.jpg',
      [
        new Ingredient('Pack of bacon', 1),
        new Ingredient('Green stuff', 1)
      ]
    ),
  ];

  getRecipes() {
    return this.recipes.slice(); // Return a copy of the local array
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}

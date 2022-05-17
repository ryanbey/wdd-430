import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  recipeSelected = new EventEmitter<Recipe>();

  constructor() {}

  private recipes: Recipe[] = [
    new Recipe(
      'Yummy Steak',
      'Get in my mouth.',
      'https://images.pexels.com/photos/65175/pexels-photo-65175.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1.jpg'
    ),
    new Recipe(
      'Is that bacon?',
      'Yes.',
      'https://images.pexels.com/photos/1927377/pexels-photo-1927377.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1.jpg'
    ),
  ];

  getRecipes() {
    return this.recipes.slice();  // Return a copy of the local array
  }
}

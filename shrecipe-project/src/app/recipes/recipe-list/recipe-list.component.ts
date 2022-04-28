import { Component, OnInit } from '@angular/core';

import { Recipe } from '../recipe.model'

@Component({
   selector: 'app-recipe-list',
   templateUrl: './recipe-list.component.html',
   styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
   recipes: Recipe[] = [
      new Recipe('Test Recipe', 'Just a test.', 'https://images.pexels.com/photos/65175/pexels-photo-65175.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1.jpg')
   ];

   constructor() { }

   ngOnInit(): void {
   }

}

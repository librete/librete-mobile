import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { CategoriesProvider } from './../../providers/categories/categories';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
    categoriesProvider: CategoriesProvider) {

    categoriesProvider.updateCategories();
  }

}

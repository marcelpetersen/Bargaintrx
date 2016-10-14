import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {CategoryData} from '../../providers/category-data/category-data';
import {AroundMePage} from '../around-me/around-me';



@Component({
  templateUrl: 'build/pages/categories/categories.html',
})
export class CategoriesPage {


  categories:any[];
  searchTerm: string = '';

  constructor(private navCtrl: NavController,private categoryData:CategoryData) {
    //this.categories=categoryData.categories;
    this.setFilteredCategories();

  }

  
  goToAroundMeWithFilter(filter:string) {
    this.navCtrl.push(AroundMePage,{filter:filter});
  }

  setFilteredCategories() {
 
        this.categories = this.categoryData.filterCategories(this.searchTerm);
 
    }

}

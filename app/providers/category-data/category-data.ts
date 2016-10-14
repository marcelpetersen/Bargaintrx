import { Injectable } from '@angular/core';



@Injectable()
export class CategoryData {

  categories:any[];

  constructor() {

  this.categories=[
  {category:'Restaurants',icon:'restaurant'},
  {category:'Shopping Malls',icon:'pricetags'},
  {category:'Markets',icon:'cart'},
  {category:'Banks',icon:'cash'},
  {category:'Gas Stations',icon:'speedometer'},
  {category:'Nightlife Spots',icon:'wine'},
  {category:'Taxi',icon:'car'},
  {category:'Spirituel Centers',icon:'sunny'},
  {category:'Historical Places',icon:'home'},
  {category:'Hospitals',icon:'medkit'},
  {category:'Pharmacies',icon:'thermometer'}
  ]; 

  }

  filterCategories(searchTerm){
 
        return this.categories.filter((category) => {
            return category.category.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
        });     
 
    }
}


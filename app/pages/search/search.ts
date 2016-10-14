import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {CategoriesPage} from '../categories/categories';
import {AroundMePage} from '../around-me/around-me';
import {BusinessDetails1Page} from '../business-details-1/business-details-1';
import {CategoryData} from '../../providers/category-data/category-data';
import {BusinessData} from '../../providers/business-data/business-data';
import {BusinessDetailsModel} from '../../models/business-details';
import {PersistentData} from '../../providers/persistent-data/persistent-data';





@Component({
  templateUrl: 'build/pages/search/search.html',
})
export class SearchPage {

  loading: any = false;
  categories: any[];
  businessDatalist: BusinessDetailsModel[];

  constructor(private navCtrl: NavController, categoryData: CategoryData, private businessData: BusinessData, private persistentData: PersistentData) {
    this.categories = categoryData.categories.slice(0, 4);
    this.getBusinessDetails();

  }



  getBusinessDetails() {
    this.loading=true;
    this.businessDatalist = [];

    this.businessData.getBusinessGeoQuery().on("key_entered", (key, location: number[], distance: number) => {

      this.businessData.getBusinessDetailsRef().child(key).on('value', (data) => {
        this.businessDatalist.push(
          new BusinessDetailsModel(key, data.val().name, data.val().email, data.val().phone,
            data.val().address, data.val().city, data.val().state, data.val().pin,
            data.val().category, data.val().imageUrl, data.val().rating, distance.toFixed(1), location)
        );
      })

    });

    this.businessData.getBusinessGeoQuery().on("ready", () => {
      this.businessData.getBusinessGeoQuery().cancel();

      this.loading=false;
       
      console.log("entered ready");
    });
  }


  filterBusniessDetails(searchTerm) {

    this.businessDatalist.filter((bd) => {
      return bd.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });

  }

  filterBusniessDetailsByCategory(searchTerm) {

    this.businessDatalist.filter((bd) => {
      return bd.category.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });

  }

  goToCategories() {
    this.navCtrl.push(CategoriesPage);
  }

  goToAroundMe() {
    this.navCtrl.push(AroundMePage);
  }

  goToAroundMeWithFilter(filter: string) {
    this.navCtrl.push(AroundMePage, { filter: filter });
  }


 addToHistory(businessDetails) {
    this.persistentData.addBusiness(businessDetails,'history').then(() => {
      console.log('Successfully Added');

    }, (err) => {
      console.log(JSON.stringify(err));
    });
  }

  goToBusinessDetails1(businessDetails: BusinessDetailsModel) {
    this.navCtrl.push(BusinessDetails1Page, { businessDetails: businessDetails });
    this.addToHistory(businessDetails);
}

  public saveBusiness(business: BusinessDetailsModel) {
    this.persistentData.addBusiness(business,'list').then(() => {
      console.log('Successfully Added');

    }, (err) => {
      console.log(JSON.stringify(err));
    });
  }


}

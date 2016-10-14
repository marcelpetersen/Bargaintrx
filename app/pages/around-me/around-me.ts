import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {BusinessData} from '../../providers/business-data/business-data';
import {BusinessDetailsModel} from '../../models/business-details';
import {BusinessDetails1Page} from '../business-details-1/business-details-1';
import {PersistentData} from '../../providers/persistent-data/persistent-data';



@Component({
  templateUrl: 'build/pages/around-me/around-me.html'
})

export class AroundMePage {

  businessDatalist: BusinessDetailsModel[];
  searchTerm: string = '';
  loading:boolean=false;

  constructor(private navCtrl: NavController, private businessData: BusinessData,private navParams: NavParams, private persistentData: PersistentData) {

    this.getBusinessDetails();
    
    if (this.navParams.get('filter')) {
      this.searchTerm = this.navParams.get('filter');
      this.filterBusniessDetailsByCategory();

    }
  
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


  addToHistory(businessDetails) {
    this.persistentData.addBusiness(businessDetails,'history').then(() => {
      console.log('Successfully Added');

    }, (err) => {
      console.log(JSON.stringify(err));
    });
  }

  filterBusniessDetails() {

    this.businessDatalist=this.businessDatalist.filter((bd) => {
      return bd.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
    });

  }

  filterBusniessDetailsByCategory() {

    this.businessDatalist=this.businessDatalist.filter((bd) => {
      return bd.category.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
    });

  }
  goToBusinessDetails1(businessDetails: BusinessDetailsModel) {
    this.navCtrl.push(BusinessDetails1Page, { businessDetails: businessDetails });
    this.addToHistory(businessDetails);
}

}

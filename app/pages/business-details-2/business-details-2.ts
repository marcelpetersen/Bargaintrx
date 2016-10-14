import { Component } from '@angular/core';
import { NavController , NavParams} from 'ionic-angular';
import {BusinessRoutePage} from '../business-route/business-route';
import {BusinessDetailsModel} from '../../models/business-details';


@Component({
  templateUrl: 'build/pages/business-details-2/business-details-2.html',
})
export class BusinessDetails2Page {

 businessDetails:BusinessDetailsModel;

  constructor(private navCtrl: NavController,navParams: NavParams) {
      this.businessDetails=navParams.get('businessDetails');
  }



 goToBusinessRoute()
 {

   document.getElementById("content").hidden = true;
this.navCtrl.push(BusinessRoutePage,{name:this.businessDetails.name,address:this.businessDetails.address,location:this.businessDetails.location})
.then(() => {
const subscription = this.navCtrl.viewWillEnter.subscribe(() => {
document.getElementById("content").hidden = false;
subscription.unsubscribe();
});
});

 }

}


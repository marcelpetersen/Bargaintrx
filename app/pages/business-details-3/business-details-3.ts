import { Component } from '@angular/core';
import { NavController , NavParams} from 'ionic-angular';
import {BusinessDetailsModel} from '../../models/business-details';
import {BusinessPhotoGalleryPage} from '../business-photo-gallery/business-photo-gallery';


@Component({
  templateUrl: 'build/pages/business-details-3/business-details-3.html',
})
export class BusinessDetails3Page {

  businessDetails:BusinessDetailsModel;

  constructor(private navCtrl: NavController,navParams: NavParams) {
      this.businessDetails=navParams.get('businessDetails');
  }


goToPhotoGallery()
{
    this.navCtrl.push(BusinessPhotoGalleryPage,{key:this.businessDetails.key});

}

}

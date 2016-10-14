import { Component } from '@angular/core';
import { NavController, Platform} from 'ionic-angular';
import {PersistentData} from '../../providers/persistent-data/persistent-data';
import {BusinessDetailsModel} from '../../models/business-details';
import {BusinessDetails1Page} from '../business-details-1/business-details-1';


@Component({
  templateUrl: 'build/pages/history/history.html',
})
export class HistoryPage {

 businessDatalist: any[];


  constructor(private navCtrl: NavController, private persistentData: PersistentData, private platform: Platform) {
  }

  ionViewDidEnter() {
    this.loadBusinessDetails();

  }


  private loadBusinessDetails() {

    this.platform.ready().then(() => {

      this.businessDatalist = [];
      this.persistentData.getHistory().then(
        data => {
          let length = data.res.rows.length;
          if (length > 0) {
            for (let i = 0; i < length; i++) {
              let item = data.res.rows.item(i);
              this.businessDatalist.push(
                new BusinessDetailsModel(item.key, item.name, item.email, item.phone,
                  item.address, item.city, item.state, item.pin,
                  item.category, item.imageUrl, item.rating, item.distance, [item.lat, item.long])
              );
            }
          }
        });

    });


  }

  goToBusinessDetails1(businessDetails: BusinessDetailsModel) {
    this.navCtrl.push(BusinessDetails1Page, { businessDetails: businessDetails });
  }

  // Remove the note from the DB and our current arra
  public removeBusiness(key) {
    this.persistentData.removeNote(key,'history');
    this.loadBusinessDetails();
  }
}

import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import {BusinessDetails2Page} from '../business-details-2/business-details-2';
import {BusinessDetails3Page} from '../business-details-3/business-details-3';
import {CommentsPage} from '../comments/comments';
import {BusinessDetailsModel} from '../../models/business-details';
import {UserModel} from '../../models/user';
import {BusinessData} from '../../providers/business-data/business-data';
import {PersistentData} from '../../providers/persistent-data/persistent-data';
import {CommentPage} from '../comment/comment';
import {RatePage} from '../rate/rate';
import {ProfileData} from '../../providers/profile-data/profile-data';



@Component({
  templateUrl: 'build/pages/business-details-1/business-details-1.html',
})
export class BusinessDetails1Page {

  businessDetails: BusinessDetailsModel;
  comments: any[];
  userProfile:UserModel;

  constructor(private profileData:ProfileData, private modalCtrl: ModalController, private navCtrl: NavController, navParams: NavParams,private businessData: BusinessData, private persistentData: PersistentData) {
    this.businessDetails = navParams.get('businessDetails');
    this.getComments();
    this.getUserInfo();
  }



  getComments()
  {
    this.businessData.getComments().child(this.businessDetails.key).on('value', (data) => {

      this.comments = [];
      data.forEach(element => {
        this.comments.push({
          uid: element.val().uid,
          name: element.val().name,
          comment: element.val().comment,
          time: new Date(element.val().time).toLocaleString(),
          thumbsup:element.val().thumbsup,
          thumbsdown:element.val().thumbsdown
        });
      });

    });


  }


  getUserInfo()
  {
    this.profileData.getUserProfile().once('value').then((data)=>{
        
        this.userProfile=new UserModel(data.val().name,data.val().surname,data.val().email,data.val().gender,data.val().dob,data.val().phone,"",data.val().type);

    });
  }


  rateBusiness() {
    let addModal = this.modalCtrl.create(RatePage);

    addModal.onDidDismiss((data) => {

      if (data) {
        this.businessData.addRating(this.businessDetails.key,data.rating,this.userProfile.name)
      }

    });

    addModal.present();

  }

  commentBusiness() {
    let addModal = this.modalCtrl.create(CommentPage);

    addModal.onDidDismiss((data) => {

      if (data) {
        this.businessData.addComment(this.businessDetails.key,data.comment,this.userProfile.name)
      }
  
  });

    addModal.present();

  }

  goToBusinessDetails2() {
    this.navCtrl.push(BusinessDetails2Page, { businessDetails: this.businessDetails });
  }


  goToBusinessDetails3() {
    this.navCtrl.push(BusinessDetails3Page, { businessDetails: this.businessDetails });

  }

  goToComments() {
    this.navCtrl.push(CommentsPage, { comments: this.comments });
  }

  addToList() {
    this.persistentData.addBusiness(this.businessDetails,'list').then(() => {
      console.log('Successfully Added');

    }, (err) => {
      console.log(JSON.stringify(err));
    });
  }


}

import { Injectable } from '@angular/core';
import { Camera } from 'ionic-native';
import * as firebase from 'firebase';


@Injectable()
export class StorageData {

  public storageRef: any;
//  public currentUser: any;
//  public userProfile: any;

  constructor() {

    this.storageRef = firebase.storage().ref();
  //  this.currentUser = firebase.auth().currentUser;
  //  this.userProfile = firebase.database().ref('/userProfile').child(this.currentUser.uid);

  }


  saveProfileImage(imageURL: string = null): any {
    return this.storageRef.child('profilePictures').child(firebase.auth().currentUser.uid)
      .child('profilePicture.jpg').putString(imageURL, 'base64', { contentType: 'image/jpeg' })
      .then(snapshot => {
        firebase.database().ref('/userProfile').child(firebase.auth().currentUser.uid).update({
          imageUrl: snapshot.downloadURL,
        });
      });
  }


  addToBusinessGallery(imageURL: string = null): any {

  }


}


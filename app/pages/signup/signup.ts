import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { FormBuilder, Validators, ControlGroup } from '@angular/common';
import { AuthData } from '../../providers/auth-data/auth-data';
import { HomePage } from '../home/home';
import { Camera } from 'ionic-native';
import {StorageData}from '../../providers/storage-data/storage-data'


@Component({
  templateUrl: 'build/pages/signup/signup.html',
})
export class SignupPage {
  public signupForm: ControlGroup;

  constructor(public nav: NavController, public authData: AuthData, public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController, public alertCtrl: AlertController, private storageData:StorageData) {

    this.signupForm = formBuilder.group({
    
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      phone: ['', Validators.required],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      type: ['', Validators.required],
      
     
      })
  }


    signupUser(){

    if (!this.signupForm.valid){
      console.log(this.signupForm.value);
    } else {
      this.authData.signupUser(
        this.signupForm.value.email, 
        this.signupForm.value.password,
        this.signupForm.value.name,
        this.signupForm.value.surname,
        this.signupForm.value.gender,
        this.signupForm.value.dob,
        this.signupForm.value.phone,
        this.signupForm.value.type )
     
      .then(() => { this.nav.setRoot(HomePage); }, 
      
      (error) => {
        var errorMessage: string = error.message;
          let alert = this.alertCtrl.create({
            message: errorMessage,
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          alert.present();
      });

      let loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      loading.present();
    }
  }

  uploadProfileImage(){
    Camera.getPicture({
      quality : 70,
      destinationType : Camera.DestinationType.DATA_URL,
      sourceType : Camera.PictureSourceType.PHOTOLIBRARY,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 200,
      targetHeight: 200,
    }).then(imageData => {
      this.storageData.saveProfileImage(imageData);
    }, error => {
      console.log("ERROR -> " + JSON.stringify(error));
    });
  }

}
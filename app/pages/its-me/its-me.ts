import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthData } from '../../providers/auth-data/auth-data';
import { LoginPage } from '../login/login';
import {ProfileData} from '../../providers/profile-data/profile-data';
import {UserModel} from '../../models/user';


@Component({
  templateUrl: 'build/pages/its-me/its-me.html',
})
export class ItsMePage {

  user:UserModel;
  
  constructor(public nav: NavController,public authData: AuthData,public profileData:ProfileData) {



  }

  logOut(){
  this.authData.logoutUser().then(() => {
    this.nav.setRoot(LoginPage);
  });
}
}

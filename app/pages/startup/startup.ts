import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { FacebookSignupPage } from '../facebook-signup/facebook-signup';
import { LoginPage } from '../login/login';
import { AuthData } from '../../providers/auth-data/auth-data';

@Component({
  templateUrl: 'build/pages/startup/startup.html',
})
export class StartupPage {

  constructor(private navCtrl: NavController,public authData: AuthData) {

  }

 goToFacebookSignup(){
 this.navCtrl.push(FacebookSignupPage);
 }

 goToEmailSignup()
 {
  this.navCtrl.push(SignupPage);
 }

  goToLogin()
 {
  this.navCtrl.push(LoginPage);
 }


}

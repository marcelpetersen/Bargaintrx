import { Component } from '@angular/core';
import { NavController, Platform} from 'ionic-angular';
import { Facebook } from 'ionic-native';
import { TabsPage } from '../../pages/tabs/tabs';

@Component({
  templateUrl: 'build/pages/facebook-signup/facebook-signup.html',
})
export class FacebookSignupPage {

  constructor(private navCtrl: NavController, private platform: Platform) {


    platform.ready().then(() => {

      Facebook.login(["public_profile"]).then((data)=>{
        console.log(data);

        Facebook.api(data.authResponse.userID,['public_profile']).then((result)=>{
          console.log(result);
        });


        
      
      });


      });




  }


  goToTabs(){
    this.navCtrl.push(TabsPage);
  }

}

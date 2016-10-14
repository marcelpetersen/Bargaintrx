import { Component } from '@angular/core';
import { ionicBootstrap, Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { TabsPage } from './pages/tabs/tabs';
import {StartupPage} from './pages/startup/startup';
import * as firebase from 'firebase';
import {BusinessData} from './providers/business-data/business-data';
import {CategoryData} from './providers/category-data/category-data';
import { AuthData } from './providers/auth-data/auth-data';
import { Notifications } from './providers/notifications/notifications';
import {StorageData}from './providers/storage-data/storage-data'
import {PersistentData} from './providers/persistent-data/persistent-data';
import {ProfileData} from './providers/profile-data/profile-data';
import {Push, PushToken } from '@ionic/cloud-angular';
import {provideCloud, CloudSettings} from '@ionic/cloud-angular';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '62143a9c',
  },
  'push': {
    'sender_id': '581846491028',
    'pluginConfig': {
      'ios': {
        'badge': true,
        'sound': true
      },
      'android': {
        'iconColor': '#343434'
      }
    }
  }
};

var config = {
  apiKey: "AIzaSyBj2nRNzg8U9WxDTxf5_tqk7ZZxy8jcWvc",
  authDomain: "ionicdemo-65128.firebaseapp.com",
  databaseURL: "https://ionicdemo-65128.firebaseio.com",
  storageBucket: "ionicdemo-65128.appspot.com",
};

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers:[BusinessData, CategoryData, AuthData, StorageData, PersistentData,ProfileData, Notifications]
})
export class MyApp {
  rootPage: any;



  constructor(public platform: Platform ,public push: Push) {
    platform.ready().then(() => {
      //initialize firebase 
      firebase.initializeApp(config);
      
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // If there's a user take him to the home page.
          this.rootPage = TabsPage;
        } else {
          // If there's no user logged in send him to the LoginPage
          this.rootPage =StartupPage ;
        }
      });


  this.push.register().then((t: PushToken) => {
      return this.push.saveToken(t);
    }).then((t: PushToken) => {
      console.log('Token saved:', t.token);
    });


    this.push.rx.notification()
    .subscribe((msg) => {
    alert(msg.title + ': ' + msg.text);
    });

      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(MyApp,[provideCloud(cloudSettings)],{
  iconMode: 'ios',
  tabsPlacement: 'bottom',
  pageTransition: 'ios-transition',
});

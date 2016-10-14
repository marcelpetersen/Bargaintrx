import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Notifications } from '../../providers/notifications/notifications';


@Component({
  templateUrl: 'build/pages/notifications/notifications.html',
})
export class NotificationsPage {

  notificationList:any[];
  loading:any=false;

  constructor(private navCtrl: NavController,private notifications:Notifications) {

//    this.getNotifications();
  }

ionViewDidEnter()
  {
     this.getNotifications();
  }


  getNotifications()
  {
      this.loading=true;
      this.notificationList=[];

      this.notifications.getNotifications().subscribe(data => {
    
       data.data.forEach(element => {
        let date=element.created.split(".")[0].split("T")[0];
        let time=element.created.split(".")[0].split("T")[1];

        this.notificationList.push({
          title:element.config.notification.title,
          message:element.config.notification.message,
          created:date+" "+time    

        });
      });

    
       console.log(data);
       this.loading=false;
        
      });
 
    
  }


}

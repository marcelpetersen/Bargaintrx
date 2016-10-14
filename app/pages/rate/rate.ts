import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';



@Component({
  templateUrl: 'build/pages/rate/rate.html',
})
export class RatePage {

  rating:number;

  constructor(private navCtrl: NavController,private view: ViewController) {

  }

  saveRating(){
 
        let newItem = {
          rating:this.rating
          
        };
 
        this.view.dismiss(newItem);
 
    }
 
    close(){
        this.view.dismiss();
    }

}

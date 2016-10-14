import { Component } from '@angular/core';
import { NavController, Platform,  NavParams } from 'ionic-angular';
import {GoogleMap, GoogleMapsEvent, GoogleMapsLatLng,GoogleMapsAnimation} from 'ionic-native';
import * as firebase from 'firebase';



@Component({
  templateUrl: 'build/pages/business-route/business-route.html',
})
export class BusinessRoutePage {

 map: GoogleMap;
 name:string;
 address:string;
 location:number[];
 
    constructor(public navCtrl: NavController, private platform: Platform,navParams: NavParams) {
        platform.ready().then(() => {
            this.loadMap();
        });

        this.name=navParams.get('name');
        this.address=navParams.get('address');
        this.location=navParams.get('location');
   }
 


loadMap(){
 
        let location = new GoogleMapsLatLng(this.location[0],this.location[1]);
 
        this.map = new GoogleMap('map', {
          'backgroundColor': 'white',
          'controls': {
            'compass': true,
            'myLocationButton': true,
            'indoorPicker': true,
            'zoom': true
          },
          'gestures': {
            'scroll': true,
            'tilt': true,
            'rotate': true,
            'zoom': true
          },
          'camera': {
            'latLng': location,
            'tilt': 30,
            'zoom': 15,
            'bearing': 50
          }
        });

        this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
            console.log('Map is ready!');
            this.addMarker();
            this.map.getMyLocation();
        });
  }


  addMarker(){
     let location = new GoogleMapsLatLng(this.location[0],this.location[1]);
 
 
  let marker=this.map.addMarker({
      'position': location,
      'title': this.name,
      'snippet': this.address,
      'animation':GoogleMapsAnimation.BOUNCE
    }).then((marker)=>{
  
      marker.showInfoWindow();
  
  });
}

}
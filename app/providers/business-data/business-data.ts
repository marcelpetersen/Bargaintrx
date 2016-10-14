import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
declare var GeoFire: any;
import {BusinessDetailsModel} from '../../models/business-details'

@Injectable()
export class BusinessData {

  public currentUser: any;
  public businessDetailsRef: any;
  public businessGeoLocationRef: any;
  public businessCommentsRef: any;
  public businessRatingsRef: any;
  private geofire: any;


  constructor() {
    this.currentUser = firebase.auth().currentUser.uid;
    this.businessDetailsRef = firebase.database().ref('/businessData/businessDetails');
    this.businessGeoLocationRef = firebase.database().ref('/businessData/businessGeoLocation');
    this.businessCommentsRef=firebase.database().ref('/businessData/businessComments');
    this.businessRatingsRef=firebase.database().ref('/businessData/businessRatings');
    this.geofire = new GeoFire(this.businessGeoLocationRef);
  }



  

  getBusinessGeoQuery():any {

    let geoQuery = this.geofire.query({
      center: [24.949665, 66.939899],
      radius: 3000
    });

    return geoQuery;
  }

getBusinessDetailsRef()
{
  return this.businessDetailsRef;
}

  addBusinessDetails(category:string,lonLat:number[]) {
    this.businessDetailsRef.push({
       name:'BusinessName',
       email:'contactus@gmail.com',
       phone:'0987654312',
       address:'This is Address',
       city:'CityName',
       state:'StateName',
       pin:'71923',
       category:category,
       imageURL:'',
       rating:'9.5'       
    }).then((newItem) => {

      this.geofire.set(newItem.key, [parseFloat(lonLat[0]+''),parseFloat(lonLat[1]+'')]).then(() => { });

    });
  }


addComment(key:any,comment:string,name:string)
{
  this.businessCommentsRef.child(key).push({
    uid:this.currentUser,
    name:name,
    comment:comment,
    time:new Date().getTime(),
    thumbsup:0,
    thumbsdown:0
  });
}

addRating(key:any,rating:number,name:string)
{
  this.businessRatingsRef.child(key).push({
    uid:this.currentUser,
    name:name,
    rating:rating,
    time:new Date().getTime()
  });
}

getComments():any
{
  return this.businessCommentsRef;
}


getRatings():any
{
  return this.businessRatingsRef;
}


}


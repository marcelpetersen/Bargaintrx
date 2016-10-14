import { Injectable } from '@angular/core';
import {Storage, SqlStorage, Platform} from 'ionic-angular';
import {BusinessDetailsModel} from '../../models/business-details';

@Injectable()
export class PersistentData {
storage: Storage;
 
  // Init an empty DB if it does not exist by now!
  constructor(platform:Platform) {
   
   platform.ready().then(()=>{
 
   this.storage = new Storage(SqlStorage);
    this.storage.query('CREATE TABLE IF NOT EXISTS business (key TEXT ,type TEXT,name TEXT, email TEXT,phone TEXT,address TEXT,city TEXT,state TEXT,pin TEXT,category TEXT,imageUrl TEXT,rating TEXT,distance TEXT,lat TEXT,long TEXT)');
 
   });
    
 
 }
 
  // Get all notes of our DB
  public getList() {
    return this.storage.query('SELECT * FROM business WHERE type=\"list\"');
  }
 
public getHistory() {
    return this.storage.query('SELECT * FROM business WHERE type=\"history\"');
  }
 

  // Save a new note to the DB
  public addBusiness(business: BusinessDetailsModel,type:string) {
    
    if(type=='history')
    {
      this.removeNote(business.key,'history');
    }

    let sql = 'INSERT INTO business VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
    return this.storage.query(sql, [business.key,type,business.name,business.email,business.phone,business.address,business.city,business.state,business.pin,business.category,business.imageURL,business.rating,business.distance,business.location[0],business.location[1]]);
  }
 
  // Update an existing note with a given ID
 /* public updateNote(business: BusinessDetailsModel) {
    let sql = 'UPDATE notes SET title = \"' + note.title + '\", text = \"' + note.text + '\" WHERE id = \"' + note.id + '\"';
    this.storage.query(sql);
  }*/
 
  // Remove with a given KEY
  public removeNote(key,type) {
    let sql = 'DELETE FROM business WHERE key = \"' + key + '\" AND type = \"' + type + '\" ';
    this.storage.query(sql);
  }

}


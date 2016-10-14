import { Component } from '@angular/core';
import { NavController, ViewController  } from 'ionic-angular';



@Component({
  templateUrl: 'build/pages/comment/comment.html',
})
export class CommentPage {

  comment:string;

  constructor(private navCtrl: NavController,private view: ViewController) {

  }


saveComment(){
 
        let newItem = {
          comment:this.comment
          
        };
 
        this.view.dismiss(newItem);
 
    }
 
    close(){
        this.view.dismiss();
    }
}

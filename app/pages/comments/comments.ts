import { Component } from '@angular/core';
import { NavController, NavParams  } from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/comments/comments.html',
})
export class CommentsPage {

  comments:any[];

  constructor(private navCtrl: NavController, navParams: NavParams) 
  {
    this.comments=navParams.get('comments');
  }

}

import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class Notifications {

  token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJlMTkxM2MwMi0yNmRjLTQxMzItODA5Zi01Y2NlN2MzZjNkYzMifQ.v5uYLRPJyOr6iGHOSz0l4bW-a0PzHWwYfYwjT-o0-QA";

  constructor(private http: Http) { }


  getNotifications():any {

    let headers = new Headers({
      'Authorization': 'Bearer ' + this.token,
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });

    return this.http.get('https://api.ionic.io/push/notifications', options).map(res => res.json());

  }

  

}


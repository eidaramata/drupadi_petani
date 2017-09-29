import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
//let apiUrl = "http://dev.eidaramata.com/auth/login/";
//let apiUrl = "http://webtoor.000webhostapp.com/api/";
let apiUrl 	 = "http://map.eidaramata.com/auth/";

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {
  data

  constructor(public http: Http) {
    console.log('Hello RestProvider Provider');
  }
restGet(type){
  return new Promise(resolve => {
    this.http.get(apiUrl + type)
      .map(res => res.json())
      .subscribe(data => {
        this.data = data;
        resolve(this.data);
      });
  });
}
restPost(credentials, type){
  return new Promise((resolve, reject) => {
    let headers = new Headers();
    this.http.post(apiUrl + type, JSON.stringify(credentials), { headers: headers }).
      subscribe(res => {
        resolve(res.json());
      }, (err) => {
        reject(err);
      });
  });

}
}

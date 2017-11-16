import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RtindakanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-rtindakan',
  templateUrl: 'rtindakan.html',
})
export class RtindakanPage {
  rlaporan = { "username": "", "token": "", "proyek_id" : "" };
  userDetails: any;
  responseData: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    const data = JSON.parse(localStorage.getItem('userDrupadi'));
    const proyek = JSON.parse(localStorage.getItem('rpryk'));
    this.userDetails = data.userData;
    this.rlaporan.username = this.userDetails.username;
    this.rlaporan.token = this.userDetails.token;
    this.rlaporan.proyek_id = proyek["pry_id"]
    console.log(this.rlaporan)
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad RtindakanPage');
  }

}

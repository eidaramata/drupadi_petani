import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest'

/**
 * Generated class for the RinfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-rinfo',
  templateUrl: 'rinfo.html',
})
export class RinfoPage {

  ringkasaninfo = { "username": "", "token": "", "proyek_id" : "" };
  userDetails: any;
  responseData: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public rest: RestProvider) {
    const data = JSON.parse(localStorage.getItem('userDrupadi'));
    const proyek = JSON.parse(localStorage.getItem('rpryk'));
    this.userDetails = data.userData;
    this.ringkasaninfo.username = this.userDetails.username;
    this.ringkasaninfo.token = this.userDetails.token;
    this.ringkasaninfo.proyek_id = proyek["pry_id"]
    console.log(this.ringkasaninfo)
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad RinfoPage');
    /*this.rest.restPost(this.mapData, "maps/welcome/get_maps_info").then((result) => {
      this.responseData = result;
      console.log(this.responseData)
            });*/
  }

}

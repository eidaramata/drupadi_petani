import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest'

/**
 * Generated class for the OneinfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-oneinfo',
  templateUrl: 'oneinfo.html',
})
export class OneinfoPage {
  userDetails: any;
  responseData: any;
  infoData = { "username": "", "action": "", "token": "" }
  constructor(public navCtrl: NavController, public navParams: NavParams, public rest: RestProvider) {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    this.infoData.username = this.userDetails.username;
    this.infoData.token = this.userDetails.token;
    this.infoData.action = "ionic_maps"

  }

  ionViewDidLoad() {
    /*console.log('ionViewDidLoad OneinfoPage');
    this.rest.infoPost({ "action": "mapionic"},"maps/welcome/ionic_maps").then((result) => {
    this.responseData = result;
    console.log(this.responseData)
      });*/
  }

}

import { Component } from '@angular/core';
import { MenuController, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest'
import { OneblokPage } from '../oneblok/oneblok';

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
  infoData = { "username": "", "area_id" : "", "action": "", "token": "" }
  constructor(public navCtrl: NavController, public navParams: NavParams, public rest: RestProvider, public menu: MenuController) {
    this.menu.swipeEnable(false);
    this.infoData.area_id = navParams.data
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    this.infoData.username = this.userDetails.username;
    this.infoData.token = this.userDetails.token;
    this.infoData.action = "ionic_maps"
    console.log(this.infoData)

  }

  ionViewDidLoad() {
    /*console.log('ionViewDidLoad OneinfoPage');
    this.rest.infoPost({ "action": "mapionic"},"maps/welcome/ionic_maps").then((result) => {
    this.responseData = result;
    console.log(this.responseData)
      });*/
  }

}

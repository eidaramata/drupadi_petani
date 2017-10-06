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
info = {"user_id" : "" }
responseData : any
  constructor(public navCtrl: NavController, public navParams: NavParams, public rest: RestProvider) {
  }

  ionViewDidLoad() {
    /*console.log('ionViewDidLoad OneinfoPage');
    this.rest.infoPost({ "action": "mapionic"},"maps/welcome/ionic_maps").then((result) => {
    this.responseData = result;
    console.log(this.responseData)
      });*/
  }

}

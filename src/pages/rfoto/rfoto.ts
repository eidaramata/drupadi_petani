import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest'

/**
 * Generated class for the RfotoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-rfoto',
  templateUrl: 'rfoto.html',
})
export class RfotoPage {
imagePath
data_tindakan
area_id
action
showImage
  constructor(public navCtrl: NavController, public navParams: NavParams, public rest: RestProvider, public viewCtrl: ViewController) {
    this.data_tindakan = JSON.parse(localStorage.getItem('tindakan'));
    this.area_id = navParams.get('area_id');
    this.action= navParams.get('action');
    this.imagePath = navParams.get('imagePath');
    this.showImage = this.rest.base_url + 'assets/attach/' + this.data_tindakan.dtmaps["org_id"] +'/tindakan/'+ navParams.get('area_id') + '/' + this.imagePath;
    console.log(this.showImage)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RfotoPage');
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
}

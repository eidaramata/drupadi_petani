import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RinfoPage } from '../rinfo/rinfo';
import { RtindakanPage } from '../rtindakan/rtindakan';
import { RestProvider } from '../../providers/rest/rest'


/**
 * Generated class for the RlaporanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-rlaporan',
  templateUrl: 'rlaporan.html',
})
export class RlaporanPage {

  tab1Root = RinfoPage;
  tab2Root = RtindakanPage;
  mapData = { "area_id": "", "username": "", "action": "", "token": "" };
  userDetails: any;
  responseData: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,  public rest: RestProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RlaporanPage');
    /*this.rest.restPost(this.mapData, "maps/welcome/get_maps_info").then((result) => {
      this.responseData = result;
      console.log(this.responseData)
            });*/
  }

}

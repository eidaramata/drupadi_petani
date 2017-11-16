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
  pryname
  constructor(public navCtrl: NavController, public navParams: NavParams,  public rest: RestProvider) {
    const proyeks = JSON.parse(localStorage.getItem('rpryk'));
    this.pryname = proyeks["pry_name"]
  }

  ionViewDidLoad() {

  }

}

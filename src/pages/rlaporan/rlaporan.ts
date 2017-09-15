import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RinfoPage } from '../rinfo/rinfo';
import { RtindakanPage } from '../rtindakan/rtindakan';
import { RkomentarPage } from '../rkomentar/rkomentar';

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
  tab3Root = RkomentarPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RlaporanPage');
  }

}

import { Component } from '@angular/core';
import { MenuController,  NavController, NavParams } from 'ionic-angular';
import { OneinfoPage } from '../oneinfo/oneinfo';
import { OnetindakanPage } from '../onetindakan/onetindakan';
import { OnekomentarPage } from '../onekomentar/onekomentar';
/**
 * Generated class for the OneblokPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  templateUrl: 'oneblok.html',
})
export class OneblokPage {

  tab1Root = OneinfoPage;
  tab2Root = OnetindakanPage;
  tab3Root = OnekomentarPage;
  area_id :any
  constructor(public navCtrl: NavController, public navParams: NavParams, public menu: MenuController) {
        this.menu.swipeEnable(false);
          this.navParams.data  = navParams.get('area_id');
          this.area_id = this.navParams.data
       //console.log(this.navParams.data);
  }

}

import { Component } from '@angular/core';
import { MenuController, NavController, NavParams } from 'ionic-angular';
import { OneinfoPage } from '../oneinfo/oneinfo';
import { OnetindakanPage } from '../onetindakan/onetindakan';
import { OnekomentarPage } from '../onekomentar/onekomentar';
import { RestProvider } from '../../providers/rest/rest'
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
  mapData = { "area_id": "", "username": "", "action": "", "token": "" };
  areas: any;
  userDetails: any;
  responseData: any;
  area_id:any
  constructor(public navCtrl: NavController, public navParams: NavParams, public menu: MenuController, public rest: RestProvider) {
    this.menu.swipeEnable(false);
    this.navParams.data = navParams.get('area_id');

    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    this.mapData.username = this.userDetails.username;
    this.mapData.token = this.userDetails.token;
    this.mapData.area_id = this.navParams.data
    this.mapData.action = "ionic_maps";
  //  console.log(this.mapData)
      this.rest.restPost(this.mapData, "maps/welcome/get_maps_info").then((result) => {
        this.responseData = result;
        console.log(this.responseData)
        localStorage.setItem('info', JSON.stringify(this.responseData));
        this.areas = this.responseData.area;
      });
      /*this.rest.restPost(this.mapData, "maps/welcome/get_maps_info").then((result) => {
        this.responseData = result;
        console.log(this.responseData)
        localStorage.setItem('tindakan', JSON.stringify(this.responseData));
        this.areas = this.responseData.area;
      });*/


  }

}

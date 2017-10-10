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
  type :any;
  mtanam :any;
  statusn :any;  
  area :any;
  responseData: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public rest: RestProvider, public menu: MenuController) {
    this.menu.swipeEnable(false);
    //this.infoData.area_id = navParams.data;
    const data = JSON.parse(localStorage.getItem('info'));
    this.mtanam 	= data.m_tanam;
	this.type 		= data.type; 
	this.statusn 	= data.status; 
	this.area 		= data.area; 
  }

  ionViewDidLoad() {
    /*console.log('ionViewDidLoad OneinfoPage');
    this.rest.infoPost({ "action": "mapionic"},"maps/welcome/ionic_maps").then((result) => {
    this.responseData = result;
    console.log(this.responseData)
      });*/
  }

}

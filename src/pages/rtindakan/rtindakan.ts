import { Component } from '@angular/core';
import { App, NavController, NavParams,  ModalController } from 'ionic-angular';
import {RriwayatPage } from '../rriwayat/rriwayat'

/**
 * Generated class for the RtindakanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-rtindakan',
  templateUrl: 'rtindakan.html',
})
export class RtindakanPage {

  userDetails: any;
  responseData: any;
  area_id
  constructor(public navCtrl: NavController, public app: App,public navParams: NavParams, public modalCtrl: ModalController) {
    const area_id = JSON.parse(localStorage.getItem('tindakan'));
    this.area_id = area_id["area_id"]
    console.log(this.area_id);
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad RtindakanPage');
  }
/*viewimage(imagepath:any, area_id:any){
  const modal = this.modalCtrl.create(RfotoPage, { imagePath: imagepath, area_id: area_id });
  modal.present();
}*/
viewimage(area_id:any){
  let nav = this.app.getRootNav();
  nav.push(RriwayatPage, {area_id:area_id,
    });

}
}

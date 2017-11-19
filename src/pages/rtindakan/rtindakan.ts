import { Component } from '@angular/core';
import { NavController, NavParams,  ModalController } from 'ionic-angular';
import {RfotoPage } from '../rfoto/rfoto'

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
  tindakan
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
    const area_tindakan = JSON.parse(localStorage.getItem('tindakan'));
    this.tindakan = area_tindakan["action_plan"]
    console.log(this.tindakan);
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad RtindakanPage');
  }
viewimage(imagepath:any, area_id:any){
  const modal = this.modalCtrl.create(RfotoPage, { imagePath: imagepath, area_id: area_id });
  modal.present();
}
}

import { Component } from '@angular/core';
import { NavController, NavParams, ModalController  } from 'ionic-angular';
import {RfotoPage } from '../rfoto/rfoto'

/**
 * Generated class for the RriwayatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-rriwayat',
  templateUrl: 'rriwayat.html',
})
export class RriwayatPage {
  area_id
  area
  tindakan
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
    this.area_id = navParams.get('area_id');
    const area_tindakan = JSON.parse(localStorage.getItem('tindakan'));
    this.tindakan = area_tindakan["action_plan"]
    console.log(this.area_id);
    console.log(this.tindakan)
    if (this.tindakan != undefined) {
      for (var i = 0; i < this.tindakan.length; i++) {
        if (this.tindakan[i]["act_area_id"] == this.area_id) {
          this.area = this.tindakan[i]["act_area_id"]
        //  console.log(this.area)
        }
      }
    } else {
      console.log("Tidak ada Tindakan")
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RriwayatPage');
  }
  viewimage(imagepath:any, area_id:any, action:any){
    const modal = this.modalCtrl.create(RfotoPage, { imagePath: imagepath, area_id:area_id, action: action });
    modal.present();
  }
}

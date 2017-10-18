import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the OnetindakanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-onetindakan',
  templateUrl: 'onetindakan.html',
})
export class OnetindakanPage {
  area_id:any;
  action:any;
  amount:any;
  subaction:any;
  area:string

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    const data_tindakan = JSON.parse(localStorage.getItem('tindakan'));
    const data_info = JSON.parse(localStorage.getItem('info'));
    this.area_id = data_info
    //console.log(this.area_id)

    for (var i = 0; i < data_tindakan.length; i++) {
    if(data_tindakan[i]["act_area_id"] == this.area_id){
      this.action = data_tindakan[i]["action"]
      this.amount = data_tindakan[i]["amount"]
      this.subaction = data_tindakan[i]["subaction"]
      this.area = data_tindakan[i]["act_area_id"]
    /*console.log(this.area)*/

    }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OnetindakanPage');
  }

}

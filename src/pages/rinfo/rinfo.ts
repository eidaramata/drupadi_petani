import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest'

/**
 * Generated class for the RinfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-rinfo',
  templateUrl: 'rinfo.html',
})
export class RinfoPage {

  ringkasaninfo = { "username": "", "token": "", "proyek_id" : "" };
  userDetails: any;
  responseData: any;
  info
  usia = []
  constructor(public navCtrl: NavController, public navParams: NavParams, public rest: RestProvider) {

  }

  ionViewDidLoad() {
    const area_info = JSON.parse(localStorage.getItem('tindakan'));
    this.info = area_info["area_info"]
    console.log(this.info);

    // ambil tanggal dari array
    var umur = []
    for(var i=0; i < this.info.length; i++){
      umur.push(this.info[i]["3"])
    }
    //ambil tanggal jam hari ini
    var hari = new Date().getDate();
    var bulan = new Date().getMonth()+1;
    var tahun = new Date().getFullYear();
    var datenow = new Date(tahun + "-" + bulan + "-"+ hari);

    // ulagi dan masukan ke infp sebanyak isi array umur
    for(var z = 0; z < umur.length; z++){
      var timeDiff = Math.abs(datenow.getTime() - (new Date (umur[0])).getTime());
      var usia = Math.ceil(timeDiff / (1000 * 3600 * 24));
      this.info[z].push(usia)
    }
}

}

import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController,ToastController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest'

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
  userDetails: any;
  area_id: any;
  area: string;
  Status = { "username": "", "token": "", "id_area": "", "stindakan": "", "action_id": "", "komentar": "" };
  responseData
  komentar = {}
  statustindakan = {}
  aksitindakan: any
  loading
  constructor(public navCtrl: NavController, public navParams: NavParams, public rest: RestProvider, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {


    const data_tindakan = JSON.parse(localStorage.getItem('tindakan'));
    this.aksitindakan = data_tindakan.action_plan
    console.log(data_tindakan)
    if (this.aksitindakan != undefined) {
      const data_info = JSON.parse(localStorage.getItem('info'));
      this.area_id = data_info
      console.log(this.area_id)
      for (var i = 0; i < this.aksitindakan.length; i++) {
        if (this.aksitindakan[i]["act_area_id"] == this.area_id) {
          this.area = this.aksitindakan[i]["act_area_id"]
          console.log(this.area)
        }
      }
    } else {
      console.log("Tidak ada Tindakan")
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OnetindakanPage');
  }
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 6000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Mengirim...',
    });

    this.loading.present();
  }
  sendTindakan(action_id: any) {
    const data = JSON.parse(localStorage.getItem('userDrupadi'));
    this.userDetails = data.userData;
    this.Status.username = this.userDetails.username;
    this.Status.token = this.userDetails.token;
    this.Status.id_area = this.area_id;
    this.Status.action_id = action_id
    localStorage.setItem('tindakan_photo', JSON.stringify(action_id));
    if (this.komentar[action_id]) {
      this.Status.komentar = this.komentar[action_id]
    }
    if (this.statustindakan[action_id]) {
      this.Status.stindakan = this.statustindakan[action_id]
    }
    //console.log(this.Status)
    //console.log(this.komentar[action_id])
    this.showLoader()
    if(this.Status.stindakan == null) {
    this.rest.restPost(this.Status, "maps/welcome/update_tindakan").then((result) => {
      this.responseData = result;
      console.log(this.responseData)
      this.presentToast("Berhasil Dikirim");
      this.loading.dismiss();
    }, (err) => {
      this.loading.dismiss();
      this.presentToast("Gagal Mengirim");
    });
  }else {
    this.loading.dismiss();
    this.presentToast("Isikan terlebih dahulu");

  }
  }
}

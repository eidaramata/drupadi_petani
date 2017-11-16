import { Component } from '@angular/core';
import { MenuController, NavController, NavParams, LoadingController,  ToastController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest'
//import { OneblokPage } from '../oneblok/oneblok';

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
  type: any;
  mtanam: any;
  statusn: any;
  area: any;
  responseData: any;
  userDetails: any;
  loading:any
  mapData = { "area_id": "", "username": "", "action": "", "token": "" };
  usia

  constructor(public navCtrl: NavController, public navParams: NavParams, public rest: RestProvider, public menu: MenuController, public loadingCtrl: LoadingController, private toastCtrl: ToastController) {
    this.menu.swipeEnable(false);
    this.mapData.area_id = navParams.data;
    const data = JSON.parse(localStorage.getItem('userDrupadi'));
    this.userDetails = data.userData;
    this.mapData.username = this.userDetails.username;
    this.mapData.token = this.userDetails.token;
    this.mapData.area_id = this.navParams.data
    this.mapData.action = "ionic_maps";
    //console.log(this.mapData)
  }

  ionViewDidLoad() {
      this.showInfo()
  }
  showLoader() {
    this.loading = this.loadingCtrl.create({
      spinner: 'ios',
      content: 'Loading..',
    });

    this.loading.present();
  }
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
      dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
showInfo(){
  this.showLoader()
  this.rest.restPost(this.mapData, "maps/welcome/get_maps_info").then((result) => {
    this.responseData = result;
    //console.log(this.responseData)
    //localStorage.setItem('info', JSON.stringify(this.responseData.area_id));
    this.mtanam = this.responseData.m_tanam;
    this.type = this.responseData.type;
    this.statusn = this.responseData.status;
    this.area = this.responseData.area;
    var hari = new Date().getDate();
    var bulan = new Date().getMonth()+1;
    var tahun = new Date().getFullYear();
    var datenow = new Date(tahun + "/" + bulan + "/"+ hari);
    var datetanam = new Date(this.mtanam.replace('-', '/'));
    var timeDiff = Math.abs(datenow.getTime() - datetanam.getTime());
    this.usia = Math.ceil(timeDiff / (1000 * 3600 * 24));
    //console.log(this.usia)

    this.loading.dismiss();
  }, (err) => {
      this.presentToast("Tidak terhubung ke server");
      this.loading.dismiss();
    });

}
}

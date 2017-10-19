import { Component } from '@angular/core';
import { MenuController, NavController, NavParams, LoadingController,  ToastController } from 'ionic-angular';
import { OneinfoPage } from '../oneinfo/oneinfo';
import { OnetindakanPage } from '../onetindakan/onetindakan';
import { OnephotoPage } from '../onephoto/onephoto';
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
  tab3Root = OnephotoPage;
  mapData = { "area_id": "", "username": "", "action": "", "token": "" };
  areas: any;
  userDetails: any;
  responseData: any;
  area_idd:any
  loading:any
  constructor(public navCtrl: NavController, public navParams: NavParams, public menu: MenuController, public rest: RestProvider, public loadingCtrl: LoadingController, private toastCtrl: ToastController) {
    this.menu.swipeEnable(false);
    this.navParams.data = navParams.get('area_id');
    this.area_idd = this.navParams.data;
  }
  ionViewDidLoad() {

  }
  showLoader() {
    this.loading = this.loadingCtrl.create({
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
  getInfo(){
    /*const data = JSON.parse(localStorage.getItem('info'));
    this.area_idd = data*/
      /*this.showLoader()
    const data = JSON.parse(localStorage.getItem('userDrupadi'));
  this.userDetails = data.userData;
    this.mapData.username = this.userDetails.username;
    this.mapData.token = this.userDetails.token;
    this.mapData.area_id = this.navParams.data
    this.mapData.action = "ionic_maps";
      this.rest.restPost(this.mapData, "maps/welcome/get_maps_info").then((result) => {
        this.responseData = result;
        localStorage.setItem('info', JSON.stringify(this.responseData));
        this.areas = this.responseData.area;
        this.loading.dismiss();
      }, (err) => {
          this.presentToast("Tidak terhubung ke server");
          this.loading.dismiss();
        });*/
  }
}

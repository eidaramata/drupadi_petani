import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest'
import { HomePage } from '../home/home'
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  userD = { "username": "", "password": "" };
  responseData: any;
  loading: any;
  pesan: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public rest:RestProvider, private toastCtrl: ToastController, public loadingCtrl: LoadingController) {
    if(localStorage.getItem('userData')){
      this.navCtrl.setRoot(HomePage);
    }
  }

  ionViewDidLoad() {
  //  console.log('ionViewDidLoad LoginPage');
  }
  login() {

    if (this.userD.username && this.userD.password) {
      this.rest.restPost(this.userD, "ionlogin").then((result) => {
        this.responseData = result;
        //console.log(this.responseData);
        if (this.responseData.userData) {
          this.showLoader();
          localStorage.setItem('userData', JSON.stringify(this.responseData));
          this.loading.dismiss();
          this.navCtrl.setRoot(HomePage);
        }
        else {
          this.presentToast("Silahkan isi username dan password dengan benar");
        }
      }, (err) => {
        this.showLoader();
        this.loading.dismiss();
        this.presentToast("Tidak terhubung ke server");
      });
    }
    else {
      this.presentToast("Harus di isi semua");
    }
  }
  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Authentication...',
      duration: 3000,
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

}

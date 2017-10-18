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
  userDrupadi = { "username": "", "password": "" };
  responseData: any;
  loading: any;
  pesan: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public rest:RestProvider, private toastCtrl: ToastController, public loadingCtrl: LoadingController) {
    if(localStorage.getItem('userDrupadi')){
      this.navCtrl.setRoot(HomePage);
    }
  }

  ionViewDidLoad() {
  //  console.log('ionViewDidLoad LoginPage');
  }
  login() {
    this.showLoader();
    this.userDrupadi.username = this.userDrupadi.username.toLowerCase()
    //console.log(this.userDrupadi)
    if (this.userDrupadi.username && this.userDrupadi.password) {
      this.rest.restPost(this.userDrupadi, "auth/ionlogin").then((result) => {
        this.responseData = result;
        console.log(this.responseData);
        if (this.responseData.userData) {
          localStorage.setItem('userDrupadi', JSON.stringify(this.responseData));
          this.navCtrl.setRoot(HomePage);
          this.loading.dismiss();
        }
        else {
          this.presentToast("Silahkan isi username dan password dengan benar");
          this.loading.dismiss();
        }
      }, (err) => {
        this.presentToast("Tidak terhubung ke server");
        this.loading.dismiss();
      });
    }
    else {
      this.presentToast("Harus di isi semua");
    }
  }
  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Authentication...',
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

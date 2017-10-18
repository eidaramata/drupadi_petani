import { Component } from '@angular/core';
import { NavController, ViewController, NavParams, LoadingController,  ToastController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest'

/**
 * Generated class for the ModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {
  userDetails: any;
  responseData: any;
  proyekData = { "username": "", "action": "", "token": "" }
  proyek:any;
  loading:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public rest: RestProvider, public viewCtrl: ViewController, public loadingCtrl: LoadingController, private toastCtrl: ToastController) {
    const data = JSON.parse(localStorage.getItem('userDrupadi'));
    this.userDetails = data.userData;
    this.proyekData.username = this.userDetails.username;
    this.proyekData.token = this.userDetails.token;
    this.proyekData.action = "ionic_maps";
    //console.log(this.mapData)
  }

  ionViewDidLoad() {
    this.getproyek()

  }
  dismiss(){
    this.viewCtrl.dismiss();

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
proyekMap(pry_id:any){
  //console.log(pry_id)
  //  this.showLoader()
    this.viewCtrl.dismiss(pry_id);
    //this.loading.dismiss();
}
getproyek(){
  this.showLoader()
  this.rest.restPost(this.proyekData, "maps/welcome/ionic_proyek").then((result) => {
    this.responseData = result;
    this.proyek = this.responseData.projects
    this.loading.dismiss();
  }, (err) => {
      this.presentToast("Tidak terhubung ke server");
      this.loading.dismiss();
    });
}
}

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
  items:any
  searchQuery;


  constructor(public navCtrl: NavController, public navParams: NavParams, public rest: RestProvider, public viewCtrl: ViewController, public loadingCtrl: LoadingController, private toastCtrl: ToastController) {
    const data = JSON.parse(localStorage.getItem('userDrupadi'));
    this.userDetails = data.userData;
    this.proyekData.username = this.userDetails.username;
    this.proyekData.token = this.userDetails.token;
    this.proyekData.action = "ionic_maps";
    //console.log(this.mapData)
    this.searchQuery = '';

    this.getproyek()

  }

  /*ionViewDidLoad() {
    this.getproyek()

  }*/
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
    this.responseData = result
    localStorage.setItem('proyek', JSON.stringify(this.responseData.projects));
    this.proyek = JSON.parse(localStorage.getItem('proyek'));
    this.loading.dismiss();
  }, (err) => {
      this.presentToast("Tidak terhubung ke server");
      this.loading.dismiss();
    });
}
getItems(search) {
      this.proyek = JSON.parse(localStorage.getItem('proyek'));
      var val = search.target.value;
      console.log("search for: " + val);

      if (val && val.trim() != '') {
    this.proyek = this.proyek.filter((item) => {
      let name: any = item;
      console.log(name.pry_name)
      return (name.pry_name.toLowerCase().indexOf(val.toLowerCase()) > -1);
    })
  }
}
onCancelSearchbar(search) {
  this.proyek = JSON.parse(localStorage.getItem('proyek'));


 }

 onClearSearchbar(search) {
   this.proyek = JSON.parse(localStorage.getItem('proyek'));


 }
}

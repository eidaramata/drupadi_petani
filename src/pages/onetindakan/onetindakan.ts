import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController,ToastController, ModalController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest'
import { OnephotoPage } from '../onephoto/onephoto'


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
  data_tindakan
  loading
  imagePath
  Image
  resultpath
  actpath
  constructor(public navCtrl: NavController, public navParams: NavParams, public rest: RestProvider, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public modalCtrl: ModalController) {
    this.data_tindakan = JSON.parse(localStorage.getItem('tindakan'));
    this.aksitindakan = this.data_tindakan.action_plan
    //console.log(this.data_tindakan)
    if (this.aksitindakan != undefined) {
      const data_info = JSON.parse(localStorage.getItem('info'));
      this.area_id = data_info
      //console.log(this.area_id)
      for (var i = 0; i < this.aksitindakan.length; i++) {
        if (this.aksitindakan[i]["act_area_id"] == this.area_id) {
          this.area = this.aksitindakan[i]["act_area_id"]
        //  console.log(this.area)
        }
      }
    } else {
      console.log("Tidak ada Tindakan")
    }
  }

  ionViewDidEnter() {
    console.log('ionViewDidLoad OnetindakanPage');
    //console.log(this.resultpath)
    if(JSON.parse(localStorage.getItem('foto')) != null){
    var rupload = JSON.parse(localStorage.getItem('foto'));
    this.resultpath = rupload["imgpath"]
    this.actpath = rupload["acts_id"]
    }
    //console.log(rupload)
  }
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
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
    if (this.komentar[action_id]) {
      this.Status.komentar = this.komentar[action_id]
    }
    //console.log(this.statustindakan)
    //console.log(action_id)

    if (this.statustindakan[action_id]) {
      this.Status.stindakan = this.statustindakan[action_id]
    }
    console.log(this.Status)
    //console.log(this.komentar[action_id])
    this.showLoader()
    if(this.Status.stindakan && this.Status.komentar != ('' && undefined)) {
    this.rest.restPost(this.Status, "maps/welcome/update_tindakan").then((result) => {
      this.responseData = result;
      console.log(this.responseData)
      this.loading.dismiss();
      this.presentToast(this.responseData.error["text"]);
    }, (err) => {
      this.loading.dismiss();
      this.presentToast("Gagal Mengirim");
    });
  }else {
    this.loading.dismiss();
    this.presentToast("Isikan terlebih dahulu");
  }
  }
  viewPhoto(action_id: any, imagep:any){
    //console.log(this.resultpath, "2")
        this.imagePath = imagep;
        this.Image = this.rest.base_url + 'assets/attach/' + this.data_tindakan.dtmaps["org_id"] +'/tindakan/'+ this.area_id + '/';
        const modal = this.modalCtrl.create(OnephotoPage, { Path: this.Image, imagePath:this.imagePath, resultPath : this.resultpath, action_id: action_id, area_id : this.area_id, photoact : this.actpath });modal.onDidDismiss(data => {
          this.ionViewDidEnter()
        })
        modal.present();
  }
}

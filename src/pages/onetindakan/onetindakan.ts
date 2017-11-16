import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController,ToastController, ModalController, AlertController } from 'ionic-angular';
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
  act_area: string;
  Status = { "username": "", "token": "", "id_area": "", "stindakan": "", "action_id": "", "komentar": "" };
  responseData
  komentar = {}
  statustindakan = {}
  aksitindakan: any
  data_tindakan
  loading
  imagePath
  urlPath
  resultpath
  actpath
  constructor(public navCtrl: NavController, public navParams: NavParams, public rest: RestProvider, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public modalCtrl: ModalController, public alertCtrl: AlertController) {
    this.data_tindakan = JSON.parse(localStorage.getItem('tindakan'));
    this.aksitindakan = this.data_tindakan.action_plan
    console.log(this.data_tindakan)
    if (this.aksitindakan != undefined) {
      //const data_info = JSON.parse(localStorage.getItem('info'));
      //this.area_id = data_info

      this.area_id = navParams.data 
      //console.log(this.area_id)
      for (var i = 0; i < this.aksitindakan.length; i++) {
        if (this.aksitindakan[i]["act_area_id"] == this.area_id) {
          this.act_area = this.aksitindakan[i]["act_area_id"]
        //  console.log(this.area)
        }
      }
    } else {
      console.log("Tidak ada Tindakan")
    }
  }

  ionViewDidEnter() {
    //console.log(this.resultpath)
    // ganti foto
    if(JSON.parse(localStorage.getItem('foto')) != (null && '')){
    var rupload = JSON.parse(localStorage.getItem('foto'));
    this.resultpath = rupload["imgpath"]
    this.actpath = rupload["acts_id"]
    }
    //console.log(rupload)
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'top',
      showCloseButton: true
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
  showLoader() {
    this.loading = this.loadingCtrl.create({
      spinner: 'ios',
      content: 'Mengirim...',
    });

    this.loading.present();
  }
  sendTindakan(action_id: any, action:any) {

    const data = JSON.parse(localStorage.getItem('userDrupadi'));
    this.userDetails = data.userData;
    this.Status.username = this.userDetails.username;
    this.Status.token = this.userDetails.token;
    this.Status.id_area = this.area_id;
    this.Status.action_id = action_id

    // cek komentar berdasarkan action_id
    if (this.komentar[action_id]) {
      this.Status.komentar = this.komentar[action_id]
    }

        //cek status tindakan == undefined jika ya
    if (this.statustindakan[action_id] == undefined) {
      // ulang response action plan
      for(var i=0; i < this.aksitindakan.length;i++){
        // jika response action_plan["action_id"] == action_id send form
        if (this.aksitindakan[i]["action_id"] == action_id) {
            var actionplanstatus = this.aksitindakan[i]["status"]
            // cek actionplanstatus != null
            if(actionplanstatus != null){
            // maka tampilkan nilai status 1 atau 2
          this.Status.stindakan = this.aksitindakan[i]["status"]
          //console.log(this.Status.stindakan,"satu")
        }
          else{
            // maka tampil kan status null
            this.Status.stindakan = this.statustindakan[action_id]
            //console.log(this.Status.stindakan, "dua")
          }
        }
      }
    }
    else{
      this.Status.stindakan = this.statustindakan[action_id]
    }

    let confirm = this.alertCtrl.create({
      title: 'Konfirmasi',
      message: 'Apa anda yakin untuk menyimpan tindakan ' + action + '?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Kembali clicked');
          }
        },
        {
          text: 'Oke',
          handler: () => {
            console.log(this.Status)

            this.showLoader()
            if(this.Status.stindakan && this.Status.komentar != ('' || undefined)) {
            this.rest.restPost(this.Status, "maps/welcome/update_tindakan").then((result) => {
              this.responseData = result;
              console.log(this.responseData)
              var tchange = "true";
              localStorage.setItem('tchange', JSON.stringify(tchange));
              this.loading.dismiss();
              this.presentToast("Berhasil tersimpan");
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
      ]
    });
    confirm.present();

  }
  viewPhoto(action_id: any, imagep:any){
    //console.log(this.resultpath, "2")
        this.imagePath = imagep;
        this.urlPath = this.rest.base_url + 'assets/attach/' + this.data_tindakan.dtmaps["org_id"] +'/tindakan/'+ this.area_id + '/';
        const modal = this.modalCtrl.create(OnephotoPage, { Path: this.urlPath, imagePath:this.imagePath, resultPath : this.resultpath, action_id: action_id, area_id : this.area_id, photoact : this.actpath });modal.onDidDismiss(data => {
          this.ionViewDidEnter()
        })
        modal.present();
  }
}

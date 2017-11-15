import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams, ToastController, ViewController, ModalController,AlertController   } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { RestProvider } from '../../providers/rest/rest'
/**
 * Generated class for the ShowphotoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-gantiphoto',
  templateUrl: 'gantiphoto.html',
})
export class GantiphotoPage {
  loading
  action_id
  Photo = { "username": "", "token": "", "act_id": "", "img": "", "area_id" : "" };
  base64Image: any
  userDetails: any;
  responseData: any;
  image_path
  constructor(public navCtrl: NavController, public navParams: NavParams, public camera: Camera, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public rest: RestProvider, public viewCtrl: ViewController, public modalCtrl: ModalController,public alertCtrl: AlertController) {
     this.action_id = navParams.get('action_id');
     this.Photo.area_id  = navParams.get('area_ids');
     this.Photo.act_id = this.action_id;
     const data = JSON.parse(localStorage.getItem('userDrupadi'));
     this.userDetails = data.userData;
     this.Photo.username = this.userDetails.username;
     this.Photo.token = this.userDetails.token;
     //console.log(this.action_id)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowphotoPage');
  }
  dismiss(){
    this.viewCtrl.dismiss();
  }
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top',
      showCloseButton: true
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
  showLoader(msg) {
    this.loading = this.loadingCtrl.create({
      spinner: 'ios',
      content: msg,
    });

    this.loading.present();
  }
  ambilGambar(){
    this.showLoader('Loading...');
    const options: CameraOptions = {
      //destinationType: this.camera.DestinationType.DATA_URL,
      //targetWidth: 1000,
      //targetHeight: 1000
      //quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is a base64 encoded string
      this.base64Image = "data:image/jpeg;base64," + imageData;
      this.Photo.img = this.base64Image;
      this.loading.dismiss();
      /*let alert = this.alertCtrl.create({
       title: 'img!',
       subTitle: this.Photo.img,
       buttons: ['OK']
        });
        alert.present();*/
      //console.log(this.Photo)
    }, (err) => {
      console.log(err);
    });
    this.loading.dismiss();
  }
  uploadPhoto(action_id:any){
    this.showLoader('Uploading...');
    console.log(this.Photo);
    if ((this.Photo.act_id && this.Photo.img) != ('' && undefined)) {
      this.rest.restPost(this.Photo, "maps/welcome/upload_tind_image").then((result) => {
        this.responseData = result;
        console.log(this.responseData);
        var foto = {"imgpath":this.responseData.error["text"], "acts_id" : this.Photo.act_id}
        localStorage.setItem('foto', JSON.stringify(foto));
        this.presentToast("Berhasil Upload");
        this.dismiss();
        this.loading.dismiss();
      }, (err) => {
        this.loading.dismiss();
        this.presentToast("Gagal Upload");
      });
    } else {
      this.loading.dismiss();
      this.presentToast("Ambil Gambar Dahulu");
    }
  }
}

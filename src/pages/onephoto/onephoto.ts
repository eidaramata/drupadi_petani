import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams, ToastController, ViewController, ModalController,AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { RestProvider } from '../../providers/rest/rest'
import { GantiphotoPage } from '../gantiphoto/gantiphoto'




/**
 * Generated class for the OnekomentarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-onephoto',
  templateUrl: 'onephoto.html',
})
export class OnephotoPage {
  public base64Image: string;
  imageFileName: any;
  userDetails: any;
  action_id: any;
  Photo = { "username": "", "token": "", "act_id": "", "img": "" };
  responseData: any;
  loading: any
  imagePath
  Path
  Photos
  haha
  constructor(public navCtrl: NavController, public navParams: NavParams, public camera: Camera, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public rest: RestProvider, public viewCtrl: ViewController, public modalCtrl: ModalController, public alertCtrl: AlertController) {

    this.imagePath = navParams.get('imagePath');
    this.Path = navParams.get('Path');
    this.action_id = navParams.get('action_id');
    this.Photos = this.Path + this.imagePath;
    this.Photo.act_id = this.action_id;
    const data = JSON.parse(localStorage.getItem('userDrupadi'));
    this.userDetails = data.userData;
    this.Photo.username = this.userDetails.username;
    this.Photo.token = this.userDetails.token;
    console.log(this.Photo)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OnekomentarPage');
  }
  dismiss() {
    this.viewCtrl.dismiss();
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
      content: 'Uploading...',
    });

    this.loading.present();
  }

  gantiPhoto(action_id:any) {
    console.log(action_id)
    const profileModal = this.modalCtrl.create(GantiphotoPage, { action_id: action_id });
    profileModal.present();
  }

  takePicture() {
    var loading = this.loadingCtrl.create({
      content: 'Loading...',
    });
    loading.present();
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
      /*let alert = this.alertCtrl.create({
       title: 'img!',
       subTitle: this.Photo.img,
       buttons: ['OK']
        });
        alert.present();*/
       loading.dismiss();
      console.log(this.Photo)
    }, (err) => {
      console.log(err);
    });
  }
  uploadFile() {
    this.showLoader()
    console.log(this.Photo)
    if ((this.Photo.act_id && this.Photo.img) != (null || '')) {
      this.rest.restPost(this.Photo, "maps/welcome/upload_tind_image").then((result) => {
      this.responseData = result;
      this.presentToast("Berhasil Upload");
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

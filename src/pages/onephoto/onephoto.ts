import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams, ToastController, ViewController, ModalController, AlertController } from 'ionic-angular';
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
  userDetails: any;
  action_id: any;
  Photo = { "username": "", "token": "", "act_id": "", "img": "", "area_id": "" };
  responseData: any;
  loading: any
  imagePath
  imagePath1
  Path
  Photos
  resultgantip
  area_ids
  result_path
  constructor(public navCtrl: NavController, public navParams: NavParams, public camera: Camera, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public rest: RestProvider, public viewCtrl: ViewController, public modalCtrl: ModalController, public alertCtrl: AlertController) {


    this.imagePath = navParams.get('imagePath');
    this.action_id = navParams.get('action_id');
    this.area_ids  = navParams.get('area_id');
    this.Photo.area_id = this.area_ids
    //console.log(this.imagePath)
    /*this.imagePath = navParams.get('imagePath');
    this.Path = navParams.get('Path');
    this.action_id = navParams.get('action_id');
    this.Photos = this.Path + this.imagePath;*/
    this.Photo.act_id = this.action_id;
    const data = JSON.parse(localStorage.getItem('userDrupadi'));
    this.userDetails = data.userData;
    this.Photo.username = this.userDetails.username;
    this.Photo.token = this.userDetails.token;
    //console.log(this.Photo)
  }

  ionViewDidLoad() {
    this.resultImage()
    console.log('ionViewDidLoad OnephotoPage');
    //console.log(this.resultgantip)
  }
  resultImage() {
    this.showLoader('Loading...')
    var resultone = this.navParams.get('resultPath');
    console.log(resultone)
    this.imagePath = this.navParams.get('imagePath');

      //sehabis ganti photo
    if ((resultone != (null && '')) && (this.imagePath != resultone) && (this.action_id == this.navParams.get('photoact') )) {
      this.imagePath1 = resultone
      this.Path = this.navParams.get('Path');
      this.Photos = this.Path + resultone;
      this.loading.dismiss();
      console.log("1", this.imagePath, this.action_id)
    } //ada imagepath
    else if (this.imagePath != ('' && null)) {
      this.imagePath1 = this.imagePath
      this.Path = this.navParams.get('Path');
      this.Photos = this.Path + this.imagePath1;
      this.loading.dismiss();
      console.log("2", this.imagePath)
    } //saat imagepath masih kosong
    else if (this.imagePath == '') {
      this.imagePath1 = this.imagePath
      this.loading.dismiss();
      console.log("3", this.imagePath)
    } else {
      this.imagePath1 = this.imagePath
      this.loading.dismiss();
      console.log("4", this.imagePath)
    }
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 4000,
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

  gantiPhoto(action_id: any, area_ids:any) {
    console.log(action_id, area_ids)
    const modal = this.modalCtrl.create(GantiphotoPage, { action_id: action_id, area_ids: area_ids });
    modal.onDidDismiss(data => {
      this.dismiss()
      this.ionViewDidLoad()
    })
    modal.present();
  }

  takePicture() {
    this.showLoader('Loading...')
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
      this.loading.dismiss();
      console.log(this.Photo)
    }, (err) => {
      console.log(err);
    });
    this.loading.dismiss();
  }
  uploadFile() {
    this.showLoader('Uploading...')
    console.log(this.Photo)
    if ((this.Photo.act_id && this.Photo.img) != ('' && undefined)) {
      this.rest.restPost(this.Photo, "maps/welcome/upload_tind_image").then((result) => {
        this.responseData = result;
        console.log(this.responseData)
        var foto = {"imgpath":this.responseData.error["text"], "acts_id" : this.Photo.act_id}
        localStorage.setItem('foto', JSON.stringify(foto));
        this.presentToast("Berhasil Upload");
        this.dismiss()
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

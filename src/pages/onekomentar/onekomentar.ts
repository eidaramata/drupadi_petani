import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams, ToastController } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { RestProvider } from '../../providers/rest/rest'



/**
 * Generated class for the OnekomentarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-onekomentar',
  templateUrl: 'onekomentar.html',
})
export class OnekomentarPage {
  public base64Image: string;
  imageFileName:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public camera : Camera, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public transfer: FileTransfer, public rest:RestProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OnekomentarPage');
  }
  takePicture(){
     this.camera.getPicture({
         destinationType: this.camera.DestinationType.DATA_URL,
         targetWidth: 1000,
         targetHeight: 1000
     }).then((imageData) => {
       // imageData is a base64 encoded string
         this.base64Image = "data:image/jpeg;base64," + imageData;
     }, (err) => {
         console.log(err);
     });
   }
   uploadFile() {
     let loader = this.loadingCtrl.create({
       content: "Uploading..."
     });
     loader.present();
     const fileTransfer: FileTransferObject = this.transfer.create();

     let options: FileUploadOptions = {
       fileKey: 'ionicfile',
       fileName: 'ionicfile',
       chunkedMode: false,
       mimeType: "image/jpeg",
       headers: {}
     }

     fileTransfer.upload(this.base64Image, 'http://192.168.0.17/camera_test/upload.php', options)
       .then((data) => {
       console.log(data+" Uploaded Successfully");
       //this.imageFileName = "http://192.168.0.7:8080/static/images/ionicfile.jpg"
       loader.dismiss();
       this.presentToast("Image uploaded successfully");
     }, (err) => {
       console.log(err);
       loader.dismiss();
       this.presentToast(err);
     });
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
}

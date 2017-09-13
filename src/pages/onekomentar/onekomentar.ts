import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';

/**
 * Generated class for the OnekomentarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-onekomentar',
  templateUrl: 'onekomentar.html',
})
export class OnekomentarPage {
  public base64Image: string;


  constructor(public navCtrl: NavController, public navParams: NavParams, public camera : Camera) {
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
}

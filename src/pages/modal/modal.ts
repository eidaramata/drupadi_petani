import { Component } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public rest: RestProvider, public viewCtrl: ViewController) {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    this.proyekData.username = this.userDetails.username;
    this.proyekData.token = this.userDetails.token;
    this.proyekData.action = "ionic_maps";
    //console.log(this.mapData)
    this.rest.restPost(this.proyekData, "maps/welcome/ionic_proyek").then((result) => {
      this.responseData = result;
      this.proyek = this.responseData.projects
      localStorage.setItem('proyek', JSON.stringify(this.proyek));
      //console.log(this.proyek)
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPage');

  }
proyekMap(pry_id:any){
  //console.log(pry_id)
    this.viewCtrl.dismiss(pry_id);

}
}

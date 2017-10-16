import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login'


/**
 * Generated class for the PenggunaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-pengguna',
  templateUrl: 'pengguna.html',
})
export class PenggunaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.logout()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PenggunaPage');
  }
  backToWelcome(){
   this.navCtrl.setRoot(LoginPage);
  }
  logout(){
    //Api Token Logout
    localStorage.clear();
     setTimeout(()=> this.backToWelcome(), 1000);
  }
}

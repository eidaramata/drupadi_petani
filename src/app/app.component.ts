import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RlaporanPage } from '../pages/rlaporan/rlaporan';
import { BantuanPage } from '../pages/bantuan/bantuan';
//import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login'
import { PenggunaPage } from '../pages/pengguna/pengguna'


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, icon:string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Ringkasan Laporan', icon: 'mail', component: RlaporanPage },
      { title: 'Bantuan', icon: 'help-circle', component: BantuanPage },
      /*{ title: 'Logout', icon: 'walk', component: PenggunaPage }*/

    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      setTimeout(() => {
        this.splashScreen.hide();
        }, 100);
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.push(page.component);
  }
}

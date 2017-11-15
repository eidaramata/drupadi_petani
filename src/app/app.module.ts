import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RlaporanPage } from '../pages/rlaporan/rlaporan';
import { BantuanPage } from '../pages/bantuan/bantuan';
import { OneblokPage } from '../pages/oneblok/oneblok';
import { OneinfoPage } from '../pages/oneinfo/oneinfo';
import { OnetindakanPage } from '../pages/onetindakan/onetindakan';
import { OnephotoPage } from '../pages/onephoto/onephoto';
import { RinfoPage } from '../pages/rinfo/rinfo';
import { RtindakanPage } from '../pages/rtindakan/rtindakan';
import { LoginPage } from '../pages/login/login'
import { PenggunaPage } from '../pages/pengguna/pengguna'
import { ModalPage } from '../pages/modal/modal'
import { GantiphotoPage } from '../pages/gantiphoto/gantiphoto'

import { HttpModule } from "@angular/http";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';
import { RestProvider } from '../providers/rest/rest';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RlaporanPage,
    BantuanPage,
    OneblokPage,
    OneinfoPage,
    OnetindakanPage,
    OnephotoPage,
    RinfoPage,
    RtindakanPage,
    LoginPage,
    PenggunaPage,
    ModalPage,
    GantiphotoPage,
  ],
  imports: [
    BrowserModule, HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RlaporanPage,
    BantuanPage,
    OneblokPage,
    OneinfoPage,
    OnetindakanPage,
    OnephotoPage,
    RinfoPage,
    RtindakanPage,
    LoginPage,
    PenggunaPage,
    ModalPage,
    GantiphotoPage,
  ],
  providers: [
    Camera,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider,
  ]
})
export class AppModule {}

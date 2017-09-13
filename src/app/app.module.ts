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
import { OnekomentarPage } from '../pages/onekomentar/onekomentar';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RlaporanPage,
    BantuanPage,
    OneblokPage,
    OneinfoPage,
    OnetindakanPage,
    OnekomentarPage
  ],
  imports: [
    BrowserModule,
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
    OnekomentarPage
  ],
  providers: [
    Camera,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

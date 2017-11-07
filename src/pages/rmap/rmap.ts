import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, LoadingController,  ToastController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest'

/**
 * Generated class for the RmapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google;
@Component({
  selector: 'page-rmap',
  templateUrl: 'rmap.html',
})
export class RmapPage {
  @ViewChild('rmap') mapElement: ElementRef;
  rmap: any;
  proyekData = { "username": "", "action": "", "token": "", "pry_id": "" }
  userDetails: any;
  responseData: any;
  namaproyek
  loading

  constructor(public navCtrl: NavController, public navParams: NavParams, public rest: RestProvider, public loadingCtrl: LoadingController, private toastCtrl: ToastController) {
    const data = JSON.parse(localStorage.getItem('userDrupadi'));
    this.userDetails = data.userData;
    this.proyekData.username = this.userDetails.username;
    this.proyekData.token = this.userDetails.token;
    this.proyekData.action = "ionic_maps";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RmapPage');
    this.rMap()
  }
  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Loading..',
    });

    this.loading.present();
  }
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
      dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
  rMap() {
    //console.log(this.proyekData)
    this.showLoader()
    this.proyekData.pry_id = this.navParams.get('pry_id');
    this.rest.restPost(this.proyekData, "maps/welcome/detail_proyek").then((result) => {
      this.responseData = result;
      console.log(this.responseData)
      this.namaproyek = this.responseData.projects["0"]["pry_name"];
      var centermap = [this.responseData.projects["0"]["lat"], this.responseData.projects["0"]["long"]] // data server
      let LatLng = new google.maps.LatLng(centermap[0], centermap[1]);

      let mapOptions = {
        center: LatLng,
        zoom: 15,
        disableDefaultUI: true,
        mapTypeId: google.maps.MapTypeId.SATELLITE
      };

      this.rmap = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      var imgl = [this.responseData.projects["0"]["imglnorth"], this.responseData.projects["0"]["imglsouth"], this.responseData.projects["0"]["imgleast"], this.responseData.projects["0"]["imglwest"]] //data server
      var boundsImg = new google.maps.LatLngBounds(
        new google.maps.LatLng(imgl[0], imgl[1]), // lat bawah long atas X
        new google.maps.LatLng(imgl[2], imgl[3]), //lat atas long bawah X
      );
      var historicalOverlay = new google.maps.GroundOverlay(
        this.rest.base_url + 'assets/attach/' + this.responseData.projects["0"]["org_id"] + '/' + this.responseData.projects["0"]["imgpath"],
        boundsImg);
        historicalOverlay.setMap(this.rmap);

        this.rmap.fitBounds(boundsImg);
    });
    this.loading.dismiss()
  }
}

import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
import { OneblokPage } from '../oneblok/oneblok';
import { RestProvider } from '../../providers/rest/rest'


declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  userDetails: any;
  responseData: any;

  mapData = { "username": "", "action": "", "token": "" }

  constructor(public navCtrl: NavController, public ngZone: NgZone, public rest: RestProvider) {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    this.mapData.username = this.userDetails.username;
    this.mapData.token = this.userDetails.token;
    this.mapData.action = "ionic_maps";
    //console.log(this.mapData)
  }
  ionViewDidLoad() {
    this.loadMap();
  }
  blok(x) {
    this.navCtrl.push(OneblokPage, {
      area_id: x
    });
  }
  loadMap() {
    this.rest.restPost(this.mapData, "maps/welcome/ionic_maps").then((result) => {
      this.responseData = result;
      console.log(this.responseData)


      var centermap = [this.responseData.dtmaps["lat"], this.responseData.dtmaps["long"]] // data server
      let LatLng = new google.maps.LatLng(centermap[0], centermap[1]);

      let mapOptions = {
        center: LatLng,
        zoom: 15,
        disableDefaultUI: true,
        mapTypeId: google.maps.MapTypeId.SATELLITE
      };

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      var bounds = new google.maps.LatLngBounds();
      var imgl = [this.responseData.dtmaps["imglnorth"], this.responseData.dtmaps["imglsouth"], this.responseData.dtmaps["imgleast"], this.responseData.dtmaps["imglwest"]] //data server
      var boundsImg = new google.maps.LatLngBounds(
        new google.maps.LatLng(imgl[0], imgl[1]), // lat bawah long atas X
        new google.maps.LatLng(imgl[2], imgl[3]), //lat atas long bawah X
      );
      var historicalOverlay = new google.maps.GroundOverlay(
        this.rest.base_url + 'assets/attach/' + this.responseData.dtmaps["org_id"] + '/' + this.responseData.dtmaps["imgpath"],
        boundsImg);
      historicalOverlay.setMap(this.map);
      var polygon = this.responseData.poly;
      var cords = [], areaid = '';
      for (var i = 0; i < polygon.length; i++) {
        var arr = polygon[i].split(" ");
        areaid = this.responseData.area_id[i];

        for (var j = 0; j < arr.length; j++) {
          var point = arr[j].split(",");
          //console.log(point)
          cords.push(new google.maps.LatLng(parseFloat(point[0]), parseFloat(point[1])));
        }
        bounds.extend(cords[cords.length - 1])

        var polygons = (new google.maps.Polygon({
          paths: cords,
          map: this.map,
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#FF0000',
          fillOpacity: 0.35,
          area_id: areaid
        }));
        var y = this;
        google.maps.event.addListener(polygons, 'click', function() { //alert(this.area_id);
          //google.maps.event.addListener(polygons,'click',  () => {
          y.ngZone.run(() => {
            var x = this.area_id;
            y.blok(x);
          });
        });
        //polygons.setMap(this.map);

        cords = [];
      }
      this.map.fitBounds(bounds);

    });
  }

}

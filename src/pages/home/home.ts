import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
import { OneblokPage } from '../oneblok/oneblok';
import { RestProvider } from '../../providers/rest/rest'


declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  userDetails: any
  responseData: any
  mapData = { "user_id": "" }

  constructor(public navCtrl: NavController, public ngZone: NgZone, public rest: RestProvider) {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    this.mapData.user_id = this.userDetails.user_id
    console.log(this.mapData)
  }
  ionViewDidLoad() {
    this.loadMap();
  }
  blok() {
    this.navCtrl.push(OneblokPage);
  }
  loadMap() {
    /*this.rest.PolygonPost(this.mapData, "welcome").then((result) => {
    this.responseData = result;
    console.log(this.responseData) });*/


    var centermap = [-6.893473, 107.545005] // seolah2 data sudah dapat dari server
    let LatLng = new google.maps.LatLng(centermap[0], centermap[1]);

    let mapOptions = {
      center: LatLng,
      zoom: 18,
      disableDefaultUI: true,
      mapTypeId: google.maps.MapTypeId.SATELLITE
    };
    var bounds = new google.maps.LatLngBounds();
    var polygons = [];
    var arr = new Array();
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    var imgl = [-6.894224, 107.544383, -6.892461, 107.545649] //seolah2 data sudah dapat dari server
    var boundsImg = new google.maps.LatLngBounds(
      new google.maps.LatLng(imgl[0], imgl[1]), // lat bawah long atas X
      new google.maps.LatLng(imgl[2], imgl[3]), //lat atas long bawah X
    );

    var historicalOverlay = new google.maps.GroundOverlay(
      'https://developers.google.com/maps/documentation/' +
      'javascript/examples/full/images/talkeetna.png',
      boundsImg);
    historicalOverlay.setMap(this.map);


    var coordinatess = {
      "blok1": [
        [-6.892528, 107.544442],
        [-6.893012, 107.544445],
        [-6.893004, 107.545276],
        [-6.892533, 107.545276]
      ],
      "blok2": [
        [-6.893627, 107.54493],
        [-6.893622, 107.545643],
        [-6.894219, 107.545649],
        [-6.894208, 107.544935]
      ],
    };
    for (var z in coordinatess) {
      console.log(z)

    }
    for (var i in coordinatess) {
      arr = [];
      for (var j = 0; j < coordinatess[i].length; j++) {
        arr.push(new google.maps.LatLng(
          parseFloat(coordinatess[i][j][0]),
          parseFloat(coordinatess[i][j][1])
        ));

        bounds.extend(arr[arr.length - 1])
      }
      console.log(arr)


      polygons.push(new google.maps.Polygon({
        path: arr,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35
      }));
      polygons[polygons.length - 1].setMap(this.map);

      google.maps.event.addListener(polygons[polygons.length - 1], 'click', () => {
        this.ngZone.run(() => {
          this.blok()
        });
      });
      this.map.fitBounds(bounds);
    }
  }
}

import { Component, ViewChild, ElementRef,NgZone } from '@angular/core';
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
  map:any;
  userDetails:any
  responseData : any
  mapData = {"user_id": "" }

  constructor(public navCtrl: NavController, public ngZone:NgZone, public rest:RestProvider) {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    this.mapData.user_id = this.userDetails.user_id
    console.log(this.mapData)
  }
  ionViewDidLoad(){
    this.loadMap();
  }
blok(){
  this.navCtrl.push(OneblokPage);
}
loadMap(){
  this.rest.PolygonPost(this.mapData, "welcome").then((result) => {
  this.responseData = result;
  console.log(this.responseData)


  var centermap =  [-6.893473,107.545005] // seolah2 data sudah dapat dari server
  let LatLng = new google.maps.LatLng(centermap[0], centermap[1]);

  let mapOptions = {
    center:LatLng,
    zoom:18,
    disableDefaultUI: true,
    mapTypeId: google.maps.MapTypeId.SATELLITE
  };
  this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  var imgl = [-6.894224,107.544383, -6.892461, 107.545649] //seolah2 data sudah dapat dari server
  var bounds = new google.maps.LatLngBounds(
    new google.maps.LatLng( imgl[0], imgl[1] ), // lat bawah long atas X
    new google.maps.LatLng( imgl[2], imgl[3] ), //lat atas long bawah X
    );

    var  historicalOverlay = new google.maps.GroundOverlay(
                'https://developers.google.com/maps/documentation/' +
            'javascript/examples/full/images/talkeetna.png',
                bounds);
      historicalOverlay.setMap(this.map);

var triangleCoords = [

  { lat: -6.892528, lng: 107.544442 },
  { lat: -6.893012, lng: 107.544445 },
  { lat: -6.893004, lng: 107.545276 },
  { lat: -6.892533, lng: 107.545276 },

];


var triangleCoords2 = [

  { lat: -6.893627, lng: 107.54493 },
  { lat: -6.893622, lng: 107.545643 },
  { lat: -6.894219, lng: 107.545649 },
  { lat: -6.894208, lng: 107.544935 },

];

      var bermudaTriangle = new google.maps.Polygon({
         paths: [triangleCoords,triangleCoords2],
         strokeColor: '#FF0000',
         strokeOpacity: 0.8,
         strokeWeight: 2,
         fillColor: '#FF0000',
         fillOpacity: 0.35
       });
       bermudaTriangle.setMap(this.map);
       google.maps.event.addListener(bermudaTriangle,'click', () => {
         this.ngZone.run(()=>{
           this.blok()
         });
        });
  });
  }
}

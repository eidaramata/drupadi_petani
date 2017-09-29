import { Component, ViewChild, ElementRef,NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
import { OneblokPage } from '../oneblok/oneblok';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('map') mapElement: ElementRef;
  map:any;

  constructor(public navCtrl: NavController, public ngZone:NgZone) {

  }
  ionViewDidLoad(){
    this.loadMap();
  }
blok(){
  this.navCtrl.push(OneblokPage);
}
loadMap(){
  let LatLng = new google.maps.LatLng(-6.893473,107.545005);

  let mapOptions = {
    center:LatLng,
    zoom:18,
    disableDefaultUI: true,
    mapTypeId: google.maps.MapTypeId.SATELLITE
  };
  this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

  var bounds = new google.maps.LatLngBounds(
          new google.maps.LatLng(-6.894224, 107.544383 ), // lat bawah long atas X
          new google.maps.LatLng( -6.892461, 107.545649 ), //lat atas long bawah X
        );

    var  historicalOverlay = new google.maps.GroundOverlay(
                'https://developers.google.com/maps/documentation/' +
            'javascript/examples/full/images/talkeetna.png',
                bounds);
      historicalOverlay.setMap(this.map);
/*
  var triangleCoords = [

        {lat: -6.895268, lng: 107.54427},
        {lat: -6.89302, lng: 107.544646},
        {lat: -6.89399, lng: 107.547612},
        {lat: -6.8958, lng: 107.545574},

      ];*/
      var triangleCoords = [

  { lat: -6.892528, lng: 107.544442 },
  { lat: -6.893012, lng: 107.544445 },
  { lat: -6.893004, lng: 107.545276 },
  { lat: -6.892533, lng: 107.545276 },

];


    var triangleCoords2 = [

  { lat: -6.893627,  lng: 107.54493  },
  { lat: -6.893622,  lng: 107.545643   },
  { lat: -6.894219,  lng: 107.545649  },
  { lat: -6.894208,  lng: 107.544935 },

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
  }
}

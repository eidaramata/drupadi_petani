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
  userDetails: any;
  responseData: any;

  mapData = { "username": "", "action": "", "token" : ""}

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
    /*var coordinatesx = {
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
      ]
    }; console.log(coordinatesx)*/
  }
  blok(x) { //alert(x);
    this.navCtrl.push(OneblokPage, {
      area_id : x
    });
  }
  loadMap() {
    this.rest.PolygonPost(this.mapData,"maps/welcome/ionic_maps").then((result) => {
		this.responseData = result;
		//console.log(this.responseData)


		var centermap = [this.responseData.dtmaps["lat"],this.responseData.dtmaps["long"]] // data server
		let LatLng = new google.maps.LatLng(centermap[0], centermap[1]);

		let mapOptions = {
		  center: LatLng,
		  zoom: 15,
		  disableDefaultUI: true,
		  mapTypeId: google.maps.MapTypeId.SATELLITE
		};

		this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
		/*var imgl = [this.responseData.dtmaps["imglnorth"],this.responseData.dtmaps["imglsouth"], this.responseData.dtmaps["imgleast"], this.responseData.dtmaps["imglwest"]] //data server
		  var boundsImg = new google.maps.LatLngBounds(
			new google.maps.LatLng( imgl[0], imgl[1] ), // lat bawah long atas X
			new google.maps.LatLng( imgl[2], imgl[3] ), //lat atas long bawah X
			);
		var historicalOverlay = new google.maps.GroundOverlay(
						this.rest.base_url + 'assets/attach/'+this.responseData.dtmaps["org_id"]+'/'+this.responseData.dtmaps["imgpath"],
						boundsImg);
			  historicalOverlay.setMap(this.map); */
		  var polygon	= this.responseData.poly;
		  var cords = [],areaid= '';
		  for(var i=0; i < polygon.length;i++){
			  var arr 	= polygon[i].split(" ");
					areaid = this.responseData.area_id[i];
          //console.log(areaid)

				for (var j=0; j < arr.length; j++) {
					  var point = arr[j].split(",");
					  //console.log(point)
					  cords.push(new google.maps.LatLng(parseFloat(point[0]), parseFloat(point[1])));
				}
				//console.log(cords)

			 var polygons = (new google.maps.Polygon({
				paths: cords,
				map: this.map,
				strokeColor: '#FF0000',
				strokeOpacity: 0.8,
				strokeWeight: 2,
				fillColor: '#FF0000',
				fillOpacity: 0.35,
				area_id : areaid
			  }));


				google.maps.event.addListener(polygons,'click',  (event) => {
          //alert(this.area_id);

					this.ngZone.run(()=>{
						//alert(this.area_id);
						var x = polygons.area_id;
						this.blok(x)
					});
				});

				//polygons.setMap(this.map);

			cords = [];
		  }
		});
    }

}

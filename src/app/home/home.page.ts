import { Component, OnInit } from '@angular/core';
import { MapboxService } from "../services/mapbox.service";
import { AlertController, LoadingController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';

//MapBox
import * as Mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  
  /*<!--
      |‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒
      | Variables globales
      |‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒
      !-->
  */
  mapa: Mapboxgl.Map;

  constructor( private mapbox:MapboxService, 
               private alertCtrl:AlertController, 
               private loadCtrl:LoadingController,
               private geolocation:Geolocation ) {}

  ngOnInit(){ 
    this.loading();
  }

  ionViewDidEnter(){
    //this.getRepartidores();
    this.getMapBox();
  }

  /*<!--
      |‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒
      | Funcion para mostrar el mapa
      |‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒
      !-->
  */
  getMapBox(){

    (Mapboxgl as any).accessToken = environment.mapBoxKey;
    
    //Obtengo mi posición actual al cargar el mapa.
    this.geolocation.getCurrentPosition().then( result =>{
      console.log("Coordenadas:", result);

      //Cargo el mapa
      this.mapa = new Mapboxgl.Map({
        container: 'mapa-mapbox', // container ID
        style: 'mapbox://styles/creatividadmovil/ckw1jb0y42lcr15p1lobac6om', // style URL
        center: [result.coords.longitude, result.coords.latitude], // starting position [lng, lat]
        zoom: 13 // starting zoom
      })

      //Coloco mi marker de mi posicion
      this.miMarker(result.coords.longitude,result.coords.latitude);

      //Control de geolocations LocalUser
      this.mapa.addControl(
        new Mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy:true
          },
          trackUserLocation:true,
          showUserHeading:true
        })
      )

    })
    
  }

  miMarker(lng:number,lat:number){
    //console.log("Resivo coords", lng,lat);
    const marker = new Mapboxgl.Marker()
    .setLngLat([lng, lat])
    .addTo( this.mapa );
  }

  async loading(){

    const loading = await this.loadCtrl.create({
      cssClass: 'customloading',
      message: 'Buscando Repartidores ...',
      spinner: 'circles',
      duration: 2000,
    })
    await loading.present();
  }


  //Ejemplo de prueba de llamada a la API
  leerapi(){
    this.mapbox.getaddressApi(25.5680313,-100.0024091).subscribe(result =>{
      console.log("Data API:", result);
    })
  }

}

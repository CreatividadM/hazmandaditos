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
    this.getGeolocation();
  }

  async getGeolocation(){

    await this.geolocation.getCurrentPosition().then((resp) =>{
      console.log(resp);
      this.market(resp.coords.longitude,resp.coords.latitude);
    })

  }
  /*<!--
      |‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒
      | Funcion para mostrar el mapa
      |‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒
      !-->
  */
  getMapBox(){
    console.log("Get MapBox");

    Mapboxgl.accessToken = environment.mapBoxKey;

    this.mapa = new Mapboxgl.Map({
      container: 'mapa-mapbox', // container ID
      style: 'mapbox://styles/creatividadmovil/ckw1jb0y42lcr15p1lobac6om', // style URL
      center: [-100.0024091, 25.5680313], // starting position [lng, lat]
      zoom: 13 // starting zoom
    })
    
    //Agregar boton de geolocations
    

  }

  /*<!--
      |‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒
      | Mostrar Alert
      |‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒
      !-->
  */
  async getRepartidores(){
    const alert = await this.alertCtrl.create({
      cssClass: "customalert",
      header: "Buscando Repartidores",
      message:"Estamos localizando repartidores presentes.",
      buttons: ['OK']
    })

    await alert.present();
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

  market(lng:number,lat:number){
    const marker = new Mapboxgl.Marker()
    .setLngLat([lng, lat])
    .addTo( this.mapa );
  }

}

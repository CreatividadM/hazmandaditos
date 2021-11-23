import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MapboxService {

  constructor( private http:HttpClient, private geolocation:Geolocation ) { }

  /*<!--
      |‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒
      | Leer coordenadas y consuta mediante HTTP el API REST
      |‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒
      !-->
  */
  getaddressApi( lat:number, lng:number){
    return this.http.get("https://api.mapbox.com/geocoding/v5/mapbox.places/"+lat+","+lng+".json?access_token="+environment.mapBoxKey)
  }


  /*<!--
      |‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒
      | Obtener Cordenadas
      |‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒
      !-->
  */

  async getCoords(){

    await this.geolocation.getCurrentPosition().then((resp) => {
      //console.log('lat:',resp.coords.latitude,'long:',resp.coords.longitude);
      //this.getaddressApi(resp.coords.latitude,resp.coords.longitude);
      //return resp.coords.latitude, resp.coords.longitude;
      let latitude = resp.coords.latitude;
      let longitude = resp.coords.longitude;

      return { lat:latitude, lng:longitude }
    }).catch(err =>{
      console.error("Error:"+err);
    })


  }

}

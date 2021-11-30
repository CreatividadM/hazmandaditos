import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

//Plugins
import { Geolocation } from '@ionic-native/geolocation/ngx';
//Importar la conexion a la DB de Firestore
import { AngularFireModule } from '@angular/fire/compat';
import { firebaseConfig } from '../environments/environment.prod';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

//Leer API REST mediante HTTP Client
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [ HttpClientModule,
             BrowserModule, 
             IonicModule.forRoot(), 
             AppRoutingModule,
             AngularFireModule.initializeApp( firebaseConfig ), // imports firebase/app needed for everything
             AngularFireDatabaseModule, // imports firebase/database, only needed for database features
             AngularFireAuthModule, // imports firebase/auth, only needed for auth features
            ],
  providers: [Geolocation,
              { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
            ],
  bootstrap: [AppComponent],
})
export class AppModule {}

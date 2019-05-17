import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { Home } from '../pages/home/home';
import { Island } from '../pages/island/island';
import { TileModalPage } from '../pages/tile-modal/tile-modal';
import { InventoryPage } from '../pages/inventory/inventory';

import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    Home,
    Island,
    TileModalPage,
    InventoryPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  exports: [
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Home,
    Island,
    TileModalPage,
    InventoryPage
  ],
  providers: [
    ScreenOrientation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

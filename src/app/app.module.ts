import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { Home } from '../pages/home/home';
import { Island } from '../pages/island/island';
import { TileModalPage } from '../pages/tile-modal/tile-modal';
import { InventoryPage } from '../pages/inventory/inventory';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { JettyPage } from '../pages/jetty/jetty';

import { Inventory } from './services/inventory';
import { GameService } from './services/gameservice';

import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    Home,
    Island,
    TileModalPage,
    InventoryPage,
    ItemDetailsPage,
    JettyPage
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
    InventoryPage,
    ItemDetailsPage,
    JettyPage
  ],
  providers: [
    ScreenOrientation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Inventory,
    GameService
  ]
})
export class AppModule {}

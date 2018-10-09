import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TileModalPage } from './tile-modal';

@NgModule({
  declarations: [
    TileModalPage,
  ],
  imports: [
    IonicPageModule.forChild(TileModalPage),
  ],
})
export class TileModalPageModule {}

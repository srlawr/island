import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Home } from '../pages/home/home';
//import { Island } from '../pages/island/island';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage:any = Home;
  // pages: Array<{title: string, component: any}>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //statusBar.styleDefault();
      //splashScreen.hide();
      console.log("App loaded in app.component.ts");
    });

    //this.pages = [
    //  { title: 'Home', component: HomePage },
    //  { title: 'Island View', component: Island }
    //];

  }
}


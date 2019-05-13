import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


import { Island } from '../island/island';

@Component({
  selector: 'home',
  templateUrl: 'home.html'
})
export class Home {

  constructor(public navCtrl: NavController) {
    console.log("home.ts loaded");

  
  }

  pushPage(){
    // push another page onto the navigation stack
    // causing the nav controller to transition to the new page
    // optional data can also be passed to the pushed page.
    console.log("pushing page");
    this.navCtrl.push(Island, {});
  }

}

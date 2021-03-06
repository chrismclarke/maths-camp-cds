import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {HomePage} from './pages/home/home';
import {CustomData} from './providers/custom-data/custom-data'


@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers: [CustomData]
})
export class MyApp {

  private rootPage: any;

  constructor(private platform: Platform, customData:CustomData) {
    this.rootPage = HomePage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(MyApp);

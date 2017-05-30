import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ProductListPage } from '../pages/product-list/product-list';
import { MyCartPage } from '../pages/my-cart/my-cart';
import { Http } from '@angular/http';

declare var PagSeguroDirectPayment;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = MyCartPage;

  pages: Array<{title: string, component: any}>;

  constructor(
      public platform: Platform,
      public statusBar: StatusBar,
      public splashScreen: SplashScreen,
      public http: Http,
   ) {
    this.getSession ();
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Produtos', component: ProductListPage },
      { title: 'Carrinho', component: MyCartPage },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  getSession() {
    this.http.get('http://127.0.0.1:8000/api/admin/session')
      .toPromise().then(response => PagSeguroDirectPayment.setSessionId(response.json().sessionId))
  }
}

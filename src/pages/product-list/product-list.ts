import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { CartProvider } from '../../providers/cart/cart';
import { MyCartPage } from '../my-cart/my-cart'
/**
 * Generated class for the ProductListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-product-list',
  templateUrl: 'product-list.html',
})
export class ProductListPage {

  public products = [];

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public http: Http,
      private cart: CartProvider,
   ){}

  ionViewDidLoad() {
    this.http.get('http://127.0.0.1:8000/api/admin/products')
      .toPromise().then(response => this.products = response.json())
  }

  addItem(item){
    this.cart.addItem(item);
    this.navCtrl.push(MyCartPage);
  }

}

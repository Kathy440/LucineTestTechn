import {Injectable} from '@angular/core';
import {Subject, from} from 'rxjs';
import * as firebase from 'firebase';
import {Basket} from '../models/baskets.models';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  baskets: Basket[] = [];
  basketSubject = new Subject<Basket[]>();

  constructor() {
    this.getBaskets();
  }

  emitBasket() {
    this.basketSubject.next(this.baskets);
  }

  saveBasket() {
    firebase.database().ref('/basket').set(this.baskets);
  }

  getBaskets() {
    firebase.database().ref('/basket')
      .on('value', (data) => {
        this.baskets = data.val() ? data.val() : [];
        this.emitBasket();
      });
  }

  addBasket(newBasket: Basket) {
    this.baskets.push(newBasket);
    this.saveBasket();
    this.emitBasket();
  }

  removeItem(basket: Basket) {
    const basketIndexToRemove = this.baskets.findIndex(
      (basketEl) => {
        if (basketEl === basket) {
          return true;
        }
      }
    );
    this.baskets.splice(basketIndexToRemove, 1);
    console.log(this.baskets.splice(basketIndexToRemove, 1));
    this.saveBasket();
    this.emitBasket();
  }

}

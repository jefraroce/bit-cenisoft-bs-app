import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart = [];
  private cartRx = new BehaviorSubject([]);
  cartObservable = this.cartRx.asObservable();

  constructor() {
    const currentCart = JSON.parse(localStorage.getItem('cart'));
    if (Array.isArray(currentCart)) {
      this.cart = currentCart;
    }
    this.cartRx.next(this.cart);
  }

  add(item) {
    this.cart.push(item);
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.cartRx.next(this.cart);
  }

  remove(index) {
    // this.cart.splice(start[, deleteCount[, item1[, item2[, ...]]]]);
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.cartRx.next(this.cart);
  }

  getItems(item) {
    return this.cart;
  }
}

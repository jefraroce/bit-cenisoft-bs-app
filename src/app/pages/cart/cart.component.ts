import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart: [];

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.cartService.cartObservable.subscribe((cart: []) => {
      this.cart = cart;
    })
  }

}

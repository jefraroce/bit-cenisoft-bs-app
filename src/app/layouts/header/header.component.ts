import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  count = 0;
  isAuthenticated = false;

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private cartService: CartService
    ) { }

  ngOnInit(): void {
    this.tokenService.tokenObservable.subscribe((token) => {
      this.isAuthenticated = token ? true : false;
    });

    this.cartService.cartObservable.subscribe((cart) => {
      this.count = cart.reduce((a, b) => a + b.quantity, 0);
    })
  }

  signOut() {
    this.tokenService.removeToken();
    this.router.navigate(['/home']);
  }
}

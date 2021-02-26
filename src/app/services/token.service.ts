import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private jwtToken = new BehaviorSubject(null);
  tokenObservable = this.jwtToken.asObservable();

  constructor() {
    this.jwtToken.next(this.getToken())
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
    this.jwtToken.next(token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  removeToken() {
    localStorage.removeItem('token');
    this.jwtToken.next(null);
  }
}

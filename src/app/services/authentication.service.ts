import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  signInWithEmailAndPassword(email: String, password: String) {
    return this.http.post('http://localhost:3000/clients/auth', {
      email,
      password
    })
  }
}

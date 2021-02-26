import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http: HttpClient) { }

  getAll(params =  {}) {
    return this.http.get('http://localhost:3000/books', params);
  }

  getOneById(bookId) {
    return this.http.get(`http://localhost:3000/books/${bookId}`);
  }
}

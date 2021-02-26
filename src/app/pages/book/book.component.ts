import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BooksService } from 'src/app/services/books.service';
import { CartService } from 'src/app/services/cart.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  quantity: number = 1;
  total: number = 0;

  book = {
    _id: '',
    cover: '',
    name: '',
    description: '',
    unitValue: 0,
    categories: []
  };

  constructor(
    private booksService: BooksService,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService
    ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe((params) => {
        this.loadBookInfo(params.id)
      });
  }

  calculateTotal() {
    this.total = this.quantity * this.book.unitValue;
  }

  loadBookInfo(idBook: String) {
    this.booksService.getOneById(idBook)
      .subscribe(
        (book: any) => {
          this.book = book;
          this.calculateTotal();
        },
        (error) => {
          console.error('Error getting book: ', error);
        }
      );
  }

  addToCart() {
    this.cartService.add({
      id: this.book._id,
      cover: this.book.cover,
      name: this.book.name,
      unitValue: this.book.unitValue,
      quantity: this.quantity
    })

    swal('Genial 🤓', '', 'success');
  }
}

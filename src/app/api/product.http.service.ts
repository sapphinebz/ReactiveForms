import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProductModel } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductHttpService {
  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<ProductModel[]>(`assets/json/products.json`).pipe(
      catchError((err) => {
        console.error(err);
        return EMPTY;
      })
    );
  }
}

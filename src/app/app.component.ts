import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { defer, of } from 'rxjs';
import { BrowserStorageService } from './browser-storage.service';
import { createProductFormGroup, Product } from './shared/product/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  productFormArray = new FormArray([]);
  filterProductName = '';
  total: number = 0;
  totalDiscount: number = 0;
  finalTotal: number = 0;
  pay: number = 0;
  tax = 0;

  ngOnInit() {
    this.addProduct();
  }

  addProduct() {
    const productFormGroup = createProductFormGroup();
    this.productFormArray.push(productFormGroup);
  }

  remove(form: AbstractControl) {
    const index = this.productFormArray.controls.findIndex(
      (group) => group === form
    );
    this.productFormArray.removeAt(index);
  }

  recalculateSummary() {
    const products = this.getAllProduct();
    let total = 0;
    let totalDiscount = 0;
    products.forEach((product) => {
      const price = product.price || 0;
      const quality = product.quality || 0;
      const discount = product.discount || 0;
      if (discount > 0) {
        totalDiscount += (quality * price * discount) / 100;
      }
      total += price * quality;
    });

    this.total = total;
    this.totalDiscount = totalDiscount;
    this.pay = this.total - this.totalDiscount;
    this.calculateTax();
  }

  calculateTax() {
    this.finalTotal = this.pay * (this.tax + 1);
  }

  getAllProduct() {
    const products: Product[] = this.productFormArray.getRawValue();
    return products;
  }
}

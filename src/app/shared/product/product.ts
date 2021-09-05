import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { ProductModel } from 'src/app/models/product';

export const productKeyName: keyof Product = 'product';
export const detailKeyName: keyof Product = 'detail';
export const qualityKeyName: keyof Product = 'quality';
export const unitKeyName: keyof Product = 'unit';
export const priceKeyName: keyof Product = 'price';
export const discountKeyName: keyof Product = 'discount';

export interface Product {
  product: ProductModel;
  detail: string;
  quality: number;
  unit: number;
  price: number;
  discount: number;
}

export type ProductForm = Record<keyof Product, AbstractControl>;
export type ProductState = Partial<Product>;

export function createProductFormGroup(): FormGroup {
  const forms: ProductForm = {
    product: new FormControl(),
    detail: new FormControl(),
    quality: new FormControl(),
    unit: new FormControl(),
    price: new FormControl(),
    discount: new FormControl(),
  };
  return new FormGroup(forms);
}

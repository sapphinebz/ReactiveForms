import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

export interface ProductPrototype<
  TYPE_ALL,
  TYPE_STRING = TYPE_ALL,
  TYPE_NUMBER = TYPE_ALL
> {
  name: TYPE_STRING;
  detail: TYPE_STRING;
  quality: TYPE_NUMBER;
  unit: TYPE_NUMBER;
  price: TYPE_NUMBER;
  discount: TYPE_NUMBER;
}

export type ProductForm = ProductPrototype<AbstractControl>;
export type Product = ProductPrototype<undefined, string, number>;
export type ProductState = Partial<Product>;

export function createProductFormGroup(): FormGroup {
  const forms: ProductForm = {
    name: new FormControl(),
    detail: new FormControl(),
    quality: new FormControl(),
    unit: new FormControl(),
    price: new FormControl(),
    discount: new FormControl(),
  };
  return new FormGroup(forms as any);
}

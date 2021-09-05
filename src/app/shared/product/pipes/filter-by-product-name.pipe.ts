import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ProductModel } from 'src/app/models/product';
import { ProductForm, productKeyName } from '../product';

@Pipe({
  name: 'filterByProductName',
})
export class FilterByProductNamePipe implements PipeTransform {
  transform(
    productForm: AbstractControl[],
    query: string,
    length: number
  ): AbstractControl[] {
    return productForm.filter((group) => {
      const product: ProductModel = group.get(productKeyName)!.value;
      if (product) {
        return (product.product_name || '').indexOf(query) !== -1;
      }
      return true;
    });
  }
}

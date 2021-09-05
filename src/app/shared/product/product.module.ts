import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { MoreDetailModule } from '../more-detail/more-detail.module';
import { ProductComponent } from './components/product/product.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { HttpProductsAutoCompleteDirective } from './directives/http-products-auto-complete.directive';
import { FilterByProductNamePipe } from './pipes/filter-by-product-name.pipe';
@NgModule({
  declarations: [ProductComponent, HttpProductsAutoCompleteDirective, FilterByProductNamePipe],
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    DropdownModule,
    MoreDetailModule,
    AutoCompleteModule,
  ],
  exports: [
    ProductComponent,
    HttpProductsAutoCompleteDirective,
    AutoCompleteModule,
    FilterByProductNamePipe,
  ],
})
export class ProductModule {}

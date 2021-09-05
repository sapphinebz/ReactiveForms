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
@NgModule({
  declarations: [ProductComponent, HttpProductsAutoCompleteDirective],
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
  ],
})
export class ProductModule {}

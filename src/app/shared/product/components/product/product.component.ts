import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import * as Product from '../../product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent implements OnInit {
  @Input() useFormGroup!: FormGroup;
  @Output() onPriceChange = new EventEmitter<any>();
  @Output() onQualityChange = new EventEmitter<any>();
  @Output() onDiscountChange = new EventEmitter<any>();

  Product = Product;

  discountOption: SelectItem[] = [
    { label: 'no define', value: 0 },
    { label: '5%', value: 5 },
    { label: '10%', value: 10 },
  ];

  unitOption: SelectItem[] = [
    { label: 'no define', value: null },
    { label: 'ea', value: 'ea' },
    { label: 'bottles', value: 'bottles' },
  ];
  private destroy$ = new Subject<void>();

  constructor() {}

  ngOnInit(): void {
    const priceControl = this.useFormGroup.get(Product.priceKeyName);
    priceControl!.valueChanges
      .pipe(debounceTime(400), takeUntil(this.destroy$))
      .subscribe(this.onPriceChange);

    const qualityControl = this.useFormGroup.get(Product.qualityKeyName);
    qualityControl!.valueChanges
      .pipe(debounceTime(400), takeUntil(this.destroy$))
      .subscribe(this.onQualityChange);

    const discountControl = this.useFormGroup.get(Product.discountKeyName);
    discountControl!.valueChanges
      .pipe(debounceTime(400), takeUntil(this.destroy$))
      .subscribe(this.onDiscountChange);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

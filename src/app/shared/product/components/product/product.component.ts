import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import * as Product from '../../product';
import { NumberInput } from '@angular/cdk/coercion';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent implements OnInit {
  @Input() useFormGroup!: FormGroup;
  @Input() set disabledRemove(val: boolean) {
    this.#disabledRemove = `${val}` === 'true' ? true : false;
  }
  get disabledRemove(): boolean {
    return this.#disabledRemove;
  }
  @Output() onPriceChange = new EventEmitter<any>();
  @Output() onQualityChange = new EventEmitter<any>();
  @Output() onDiscountChange = new EventEmitter<any>();
  @Output() onClickRemove = new EventEmitter<any>();

  Product = Product;
  #disabledRemove = false;

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

  remove(event: any) {
    this.onClickRemove.emit(event);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  static ngAcceptInputType_useFormGroup: AbstractControl | FormGroup;
  static ngAcceptInputType_disabledRemove: 'false' | 'true' | false | true;
}

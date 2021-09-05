import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Host,
  Input,
  OnInit,
  Optional,
  Output,
  Self,
} from '@angular/core';
import {
  ControlContainer,
  FormArray,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { Product, ProductPrototype } from './product';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent implements OnInit {
  @Input() useFormGroup!: FormGroup;
  @Input() disableRemove = false;
  @Output() onRemove = new EventEmitter<Event>();
  @Output() onPriceChange = new EventEmitter<any>();
  @Output() onQualityChange = new EventEmitter<any>();
  @Output() onDiscountChange = new EventEmitter<any>();

  discountOption: SelectItem[] = [
    { label: 'no define', value: 0 },
    { label: '5%', value: 5 },
    { label: '10%', value: 10 },
  ];

  unitOption: SelectItem[] = [
    { label: 'no define', value: null },
    { label: 'ea', value: 'ea' },
  ];
  private destroy$ = new Subject<void>();

  constructor() {}

  ngOnInit(): void {
    const priceKeyName: keyof Product = 'price';
    const qualityKeyName: keyof Product = 'quality';
    const discountKeyName: keyof Product = 'discount';
    const priceControl = this.useFormGroup.get(priceKeyName);
    priceControl!.valueChanges
      .pipe(debounceTime(400), takeUntil(this.destroy$))
      .subscribe(this.onPriceChange);

    const qualityControl = this.useFormGroup.get(qualityKeyName);
    qualityControl!.valueChanges
      .pipe(debounceTime(400), takeUntil(this.destroy$))
      .subscribe(this.onQualityChange);

    const discountControl = this.useFormGroup.get(discountKeyName);
    discountControl!.valueChanges
      .pipe(debounceTime(400), takeUntil(this.destroy$))
      .subscribe(this.onDiscountChange);
  }

  remove(event: any) {
    this.onRemove.emit(event);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

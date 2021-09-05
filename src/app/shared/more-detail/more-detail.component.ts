import {
  Attribute,
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  OnInit,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-more-detail',
  templateUrl: './more-detail.component.html',
  styleUrls: ['./more-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MoreDetailComponent),
      multi: true,
    },
  ],
})
export class MoreDetailComponent implements OnInit, ControlValueAccessor {
  detail: string = '';
  displayDialog = false;
  onModelChange: (value: string) => void = () => {};
  onModelTouched: () => void = () => {};
  constructor(@Attribute('header') public header: string) {}

  writeValue(detail: string): void {
    this.detail = detail;
  }
  registerOnChange(fn: any): void {
    this.onModelChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onModelTouched = fn;
  }

  updateDetail(detail: string) {
    this.detail = detail;
    this.onModelChange(detail);
  }

  ngOnInit(): void {}
}

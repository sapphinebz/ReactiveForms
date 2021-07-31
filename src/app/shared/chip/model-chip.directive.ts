import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Renderer2,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Chip } from 'primeng/chip';
import { BehaviorSubject, fromEvent, Subscription } from 'rxjs';
import { distinctUntilChanged, tap } from 'rxjs/operators';
import { ModelChipGroupDirective } from './model-chip-group.directive';

@Directive({
  selector: '[appModelChip]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ModelChipDirective),
      multi: true,
    },
  ],
})
export class ModelChipDirective
  implements ControlValueAccessor, OnDestroy, OnInit
{
  onModelChange!: (value: boolean | null) => void;
  onModelTouched!: () => void;
  #selectedAction = new BehaviorSubject<boolean>(false);
  get selected() {
    return this.#selectedAction.value;
  }
  set selected(value: boolean | null) {
    this.#selectedAction.next(Boolean(value));
  }

  private select$ = this.#selectedAction.pipe(
    distinctUntilChanged(),
    tap((value) => {
      this.refreshStyle(value);
    })
  );

  private selectedSub!: Subscription;

  private clickSub = fromEvent(this.el.nativeElement, 'click')
    .pipe(
      tap((event) => {
        event.preventDefault();
        this.selected = !this.selected;
        if (this.selected) {
          this.onModelChange(this.appModelChipValue || this.selected);
        } else {
          this.onModelChange(null);
        }
        this.groupValueCheck();
      })
    )
    .subscribe();

  @Input() appModelChipValue: any;

  constructor(
    private el: ElementRef<HTMLElement>,
    private renderer2: Renderer2,
    private chip: Chip,
    private cd: ChangeDetectorRef,
    @Optional() private modelChipGroup: ModelChipGroupDirective
  ) {
    if (this.modelChipGroup) {
      this.modelChipGroup.register(this);
    }
  }

  ngOnInit(): void {
    this.renderer2.addClass(this.el.nativeElement, 'cursor-pointer');
    this.renderer2.addClass(this.el.nativeElement, 'select-none');
    this.selectedSub = this.select$.subscribe();
  }

  writeValue(selected: any): void {
    if (typeof selected === 'boolean') {
      this.selected = selected;
    } else {
      this.selected = selected === this.appModelChipValue;
    }
  }
  registerOnChange(fn: any): void {
    this.onModelChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onModelTouched = fn;
  }

  addClass(className: string) {
    this.chip.styleClass = (this.chip.styleClass || '') + ' ' + className;
    this.cd.detectChanges();
  }

  removeClass(className: string) {
    this.chip.styleClass = (this.chip.styleClass || '').replace(
      new RegExp(`\\s+${className}`),
      ''
    );
    this.cd.detectChanges();
  }

  refreshStyle(value = this.selected) {
    if (value) {
      this.addClass('bg-primary');
    } else {
      this.removeClass('bg-primary');
    }
  }

  groupValueCheck() {
    if (this.modelChipGroup) {
      this.modelChipGroup.valueCheck(this);
    }
  }

  ngOnDestroy(): void {
    this.selectedSub.unsubscribe();
    this.clickSub.unsubscribe();
  }
}

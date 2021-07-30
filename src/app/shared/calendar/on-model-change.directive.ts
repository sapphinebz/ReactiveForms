import { Directive, HostListener, Output } from '@angular/core';
import { Calendar } from 'primeng/calendar';
import { combineLatest, Subject } from 'rxjs';
import {
  distinctUntilChanged,
  map,
  mapTo,
  share,
  switchMap,
} from 'rxjs/operators';

@Directive({
  selector: '[appOnModelChange]',
  exportAs: 'appOnModelChange',
})
export class OnModelChangeDirective {
  #modelChange = new Subject<any>();
  @Output() appOnModelChange = combineLatest([
    this.#modelChange,
    this.calendar.onBlur,
  ]).pipe(
    map(([value, _]) => value),
    distinctUntilChanged(),
    share()
  );

  constructor(public calendar: Calendar) {}

  @HostListener('ngModelChange', ['$event']) onModelChange(value: any) {
    this.#modelChange.next(value);
  }
}

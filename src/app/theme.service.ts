import { ElementRef, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable()
export class ThemeService implements OnDestroy {
  private lightTheme$ = new BehaviorSubject<string>('light');
  private destroy$ = new Subject<void>();
  constructor(private el: ElementRef<HTMLElement>) {
    this.lightTheme$.pipe(takeUntil(this.destroy$)).subscribe((theme) => {
      this.el.nativeElement.dataset.theme = theme;
    });
  }

  switchToLightTheme() {
    this.lightTheme$.next('light');
  }

  switchToDarkTheme() {
    this.lightTheme$.next('dark');
  }

  switchToPastelTheme() {
    this.lightTheme$.next('pastel');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

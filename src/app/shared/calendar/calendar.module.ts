import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnModelChangeDirective } from './on-model-change.directive';
import { CalendarModule as PrimeNgCalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [OnModelChangeDirective],
  imports: [CommonModule, PrimeNgCalendarModule],
  exports: [OnModelChangeDirective, PrimeNgCalendarModule],
})
export class CalendarModule {}

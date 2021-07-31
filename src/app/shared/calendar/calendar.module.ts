import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnModelChangeDirective } from './on-model-change.directive';
import { CalendarModule as PrimeNgCalendarModule } from 'primeng/calendar';
import { DayLabelPipe } from './day-label.pipe';

@NgModule({
  declarations: [OnModelChangeDirective, DayLabelPipe],
  imports: [CommonModule, PrimeNgCalendarModule],
  exports: [OnModelChangeDirective, PrimeNgCalendarModule, DayLabelPipe],
})
export class CalendarModule {}

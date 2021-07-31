import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dayLabel',
})
export class DayLabelPipe implements PipeTransform {
  mapper: { [key: number]: string } = {
    0: 'Sun',
    1: 'Mon',
    2: 'Tue',
    3: 'Wed',
    4: 'Thur',
    5: 'Fri',
    6: 'Sat',
  };
  transform(value: number): string {
    return this.mapper[value];
  }
}

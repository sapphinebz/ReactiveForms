import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Calendar } from 'primeng/calendar';
import { animationFrameScheduler } from 'rxjs';
import { Timecard } from 'src/app/shared/interfaces/timecard';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  timecards: Timecard[] = [];

  startForm = new FormControl();
  endForm = new FormControl();
  formGroup = new FormGroup({
    startForm: this.startForm,
    endForm: this.endForm,
  });

  constructor() {}

  ngOnInit(): void {}

  selectStartTimecard(calendar: Calendar) {
    animationFrameScheduler.schedule(() =>
      this.endForm.setValue(calendar.inputFieldValue)
    );
  }

  submit() {
    const timecard: Timecard = {
      start: this.startForm.value,
      end: this.cloneAdjustTime(this.endForm.value, this.startForm.value),
    };

    this.timecards.push(timecard);
    this.formGroup.reset();
  }

  cloneAdjustTime(endText: string, start: Date) {
    const date = new Date(start.getTime());
    const { hour, minute } = this.extractTime(endText);
    date.setHours(Number(hour));
    date.setMinutes(Number(minute));
    return date;
  }

  extractTime(timeText: string) {
    const matches = timeText.match(/(\d+)\:(\d+)/);
    return (
      (matches && { hour: matches[1], minute: matches[2] }) || {
        hour: 0,
        minute: 0,
      }
    );
  }
}

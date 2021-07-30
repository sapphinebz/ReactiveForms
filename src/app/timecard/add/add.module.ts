import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddRoutingModule } from './add-routing.module';
import { AddComponent } from './add.component';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'src/app/shared/calendar/calendar.module';

@NgModule({
  declarations: [AddComponent],
  imports: [
    CommonModule,
    InputTextModule,
    ReactiveFormsModule,
    AddRoutingModule,
    CalendarModule,
  ],
})
export class AddModule {}

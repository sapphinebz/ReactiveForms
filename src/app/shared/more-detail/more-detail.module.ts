import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoreDetailComponent } from './more-detail.component';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [MoreDetailComponent],
  imports: [
    CommonModule,
    ButtonModule,
    DialogModule,
    InputTextareaModule,
    FormsModule,
  ],
  exports: [MoreDetailComponent],
})
export class MoreDetailModule {}

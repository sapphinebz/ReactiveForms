import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelChipDirective } from './model-chip.directive';
import { ChipModule as PChipModule } from 'primeng/chip';
import { ModelChipGroupDirective } from './model-chip-group.directive';

@NgModule({
  declarations: [ModelChipDirective, ModelChipGroupDirective],
  imports: [CommonModule, PChipModule],
  exports: [PChipModule, ModelChipDirective, ModelChipGroupDirective],
})
export class ChipModule {}

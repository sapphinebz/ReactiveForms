import { Directive } from '@angular/core';
import { ModelChipDirective } from './model-chip.directive';

@Directive({
  selector: '[appModelChipGroup]',
})
export class ModelChipGroupDirective {
  private observers: ModelChipDirective[] = [];
  constructor() {}

  register(object: ModelChipDirective) {
    this.observers.push(object);
    return () => {
      const index = this.observers.findIndex((o) => o === object);
      if (index > -1) {
        this.observers.splice(index);
      }
    };
  }

  valueCheck(unlike: ModelChipDirective) {
    this.observers.forEach((model) => {
      if (model !== unlike) {
        // model.refreshStyle();
        model.selected = false;
      }
    });
  }
}

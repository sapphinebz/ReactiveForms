import { Component } from '@angular/core';
import { defer, of } from 'rxjs';
import { BrowserStorageService } from './browser-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isReal = null;
  title = 'ReactiveForms';

  hero$ = defer(() => of(this.localStorageService.get('hero')));

  constructor(private localStorageService: BrowserStorageService) {
    // this.localStorageService.set('hero', 'Dr Breeze');
  }
}

import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { defer, of } from 'rxjs';
import { BrowserStorageService } from './browser-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  active = true;
}

import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-settings-header',
  standalone: false,

  templateUrl: './settings-header.component.html',
  styleUrl: './settings-header.component.scss',
})
export class SettingsHeaderComponent {
  constructor(private location: Location) {}

  goBack() {
    this.location.back();
  }
}

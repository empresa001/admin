import { Component, OnInit, Injectable } from '@angular/core';
import { SettingsService } from '../../services/settings/settings.service';


@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})

export class AccountSettingsComponent implements OnInit {

  constructor(private settingsService: SettingsService) { }

  ngOnInit(): void {
    this.settingsService.checkCurrentTheme();
  }

  cambiarTheme(theme: string) {
    this.settingsService.cambiarTheme( theme );
  }

}

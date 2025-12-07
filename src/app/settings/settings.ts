import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';
import { SettingsService } from './settings.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule, MatCardModule, MatSlideToggleModule, 
    MatButtonModule, MatSnackBarModule, MatDividerModule, FormsModule
  ],
  templateUrl: './settings.html',
  styleUrl: './settings.css'
})
export class SettingsComponent implements OnInit {
  private _snackBar = inject(MatSnackBar);
  private _settingsService = inject(SettingsService);


  emailNotif = true;
  darkMode = false;
  autoSave = true;

  ngOnInit() {
    const currentConfig = this._settingsService.getConfig();
    this.emailNotif = currentConfig.emailNotif;
    this.darkMode = currentConfig.darkMode;
    this.autoSave = currentConfig.autoSave;
  }

  saveSettings() {
    this._settingsService.saveConfig({
      emailNotif: this.emailNotif,
      darkMode: this.darkMode,
      autoSave: this.autoSave
    });
    
    this._snackBar.open('💾 Configuración guardada y aplicada', 'OK', {
      duration: 3000
    });
  }
}
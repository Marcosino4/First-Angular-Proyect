import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  
  private config = {
    emailNotif: true,
    darkMode: false,
    autoSave: true
  };

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.loadConfig();
  }

  private loadConfig() {
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem('appConfig');
      if (saved) {
        this.config = JSON.parse(saved);
        this.applyTheme();
      }
    }
  }

  getConfig() {
    return this.config;
  }

  saveConfig(newConfig: any) {
    this.config = { ...this.config, ...newConfig };
    
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('appConfig', JSON.stringify(this.config));
      this.applyTheme();
    }
  }

  private applyTheme() {
    if (isPlatformBrowser(this.platformId)) {
      if (this.config.darkMode) {
        document.body.classList.add('dark-theme');
      } else {
        document.body.classList.remove('dark-theme');
      }
    }
  }
}
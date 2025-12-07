import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SettingsService } from './settings/settings.service';

@Component({
  selector: 'dialog-profile',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <h2 mat-dialog-title>Perfil de Usuario</h2>
    <mat-dialog-content>
      <div style="display:flex; flex-direction:column; align-items:center; gap:10px; padding: 20px;">
        <mat-icon style="font-size: 60px; height: 60px; width: 60px; color: #555;">account_circle</mat-icon>
        
        <h3>Administrador Principal</h3>
        <p style="color:gray; margin: 0;">admin@empresa.com</p>
        <p style="margin-top: 5px;">Rol: <strong>Super Admin</strong></p>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancelar</button>
      <button mat-raised-button color="warn" [mat-dialog-close]="true">Cerrar Sesión</button>
    </mat-dialog-actions>
  `
})
export class ProfileDialog {}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    RouterLink, 
    RouterLinkActive,
    MatSidenavModule, 
    MatToolbarModule, 
    MatIconModule, 
    MatButtonModule, 
    MatListModule,
    MatSnackBarModule, 
    MatDialogModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  title = 'Mi Dashboard';
  isMenuOpen = true;
  
  private _snackBar = inject(MatSnackBar);
  readonly dialog = inject(MatDialog);
  private _settings = inject(SettingsService);

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  showNotification() {
    this._snackBar.open('🔔 No tienes notificaciones nuevas', 'Cerrar', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
  }

  openProfile() {
    const dialogRef = this.dialog.open(ProfileDialog);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._snackBar.open('🔒 Sesión cerrada correctamente', 'Adiós', { duration: 3000 });
      }
    });
  }
}
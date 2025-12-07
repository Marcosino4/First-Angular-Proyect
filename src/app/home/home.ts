import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatSnackBarModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {
  private _snackBar = inject(MatSnackBar);

  cards = [
    { title: 'Ingresos', value: 45200, prefix: '€', icon: 'payments', color: 'text-green' },
    { title: 'Usuarios', value: 1240, prefix: '', icon: 'group_add', color: 'text-blue' },
    { title: 'Alertas', value: 12, prefix: '', icon: 'warning', color: 'text-red' },
    { title: 'Tareas', value: 5, prefix: '', icon: 'assignment', color: 'text-purple' }
  ];

  showPromoDetails() {
    this._snackBar.open('🚀 Abriendo detalles de la versión 2.0...', 'OK', { duration: 2000 });
  }

  refreshData() {
    this._snackBar.open('🔄 Actualizando datos en tiempo real...', '', { duration: 1000 });
    
    this.cards = this.cards.map(card => ({
      ...card,
      value: Math.floor(card.value * (0.9 + Math.random() * 0.2))
    }));
  }
}
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

export interface UserElement {
  id: number;
  name: string;
  role: string;
  status: string;
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule, 
    MatTableModule, 
    MatCardModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatIconModule, 
    MatButtonModule, 
    MatSnackBarModule
  ],
  templateUrl: './users.html',
  styleUrl: './users.css'
})
export class UsersComponent {
  private _snackBar = inject(MatSnackBar);
  
  displayedColumns: string[] = ['id', 'name', 'role', 'status', 'actions'];
  
  dataSource = new MatTableDataSource<UserElement>([
    {id: 1, name: 'Ana García', role: 'Admin', status: 'Activo'},
    {id: 2, name: 'Carlos Diaz', role: 'Editor', status: 'Inactivo'},
    {id: 3, name: 'Elena Nito', role: 'Viewer', status: 'Activo'},
    {id: 4, name: 'Pedro Pcap', role: 'Admin', status: 'Pendiente'},
    {id: 5, name: 'Luis M.', role: 'Editor', status: 'Activo'},
  ]);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addUser() {
    const maxId = this.dataSource.data.length > 0 
      ? Math.max(...this.dataSource.data.map(user => user.id)) 
      : 0;
    const nextId = maxId + 1;

    const name = prompt("Ingrese el nombre del nuevo usuario:", `Usuario ${nextId}`);
    if (!name) return;

    const role = prompt("Ingrese el rol (Admin, Editor, Viewer):", "Viewer");
    
    const newUser: UserElement = {
      id: nextId,
      name: name,
      role: role || 'Viewer',
      status: 'Activo'
    };


    const currentData = this.dataSource.data;
    this.dataSource.data = [newUser, ...currentData]; 

    this._snackBar.open(`✅ Usuario #${nextId} creado con éxito`, 'Cerrar', { duration: 3000 });
  }

  editUser(user: UserElement) {
    const newName = prompt("Editar nombre:", user.name);
    if (newName === null) return;

    const newRole = prompt("Editar rol:", user.role);
    if (newRole === null) return;


    const index = this.dataSource.data.findIndex(u => u.id === user.id);
    if (index !== -1) {
      const updatedData = [...this.dataSource.data];
      updatedData[index] = {
        ...user,
        name: newName || user.name,
        role: newRole || user.role
      };
      
      this.dataSource.data = updatedData;
      this._snackBar.open(`✏️ Usuario actualizado correctamente`, 'Cerrar', { duration: 3000 });
    }
  }

  deleteUser(user: UserElement) {
    if(confirm(`¿Seguro que quieres borrar a ${user.name}?`)) {
      this.dataSource.data = this.dataSource.data.filter(u => u.id !== user.id);
      this._snackBar.open('🗑️ Usuario eliminado', 'OK', { duration: 3000 });
    }
  }
}
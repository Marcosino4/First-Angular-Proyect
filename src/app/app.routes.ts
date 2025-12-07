import { Routes } from '@angular/router';
import { UsersComponent } from './users/users'; 
import { HomeComponent } from './home/home';
import { SettingsComponent } from './settings/settings';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'users', component: UsersComponent },
  { path: 'settings', component: SettingsComponent },
  { path: '**', redirectTo: '/home' }
];
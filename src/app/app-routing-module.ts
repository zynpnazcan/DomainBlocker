import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { loadRemoteModule } from '@angular-architects/module-federation';

const routes: Routes = [
  // 1. Ana Sayfa (Mevcut)
  { path: '', component: DashboardComponent, pathMatch: 'full' },

  // 2. Sistem Logları Sayfası (Mevcut - Port 4203)
  {
    path: 'logs', 
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4203/remoteEntry.js',
        exposedModule: './LogsComponent' 
      })
      .then(m => m.LogsComponent) 
      .catch(err => {
        console.error("Log MFE'sine ulaşılamadı:", err);
        throw err; 
      })
  },

  // 3. İstatistikler Sayfası (Port 4204)
  {
    path: 'dashboard',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4204/remoteEntry.js',
        exposedModule: './DashboardModule'
      })
      .then(m => m.DashboardModule)
      .catch(err => console.error("Yüklenemedi:", err))
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
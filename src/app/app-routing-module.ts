import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { loadRemoteModule } from '@angular-architects/module-federation';

const routes: Routes = [
  { path: '', component: DashboardComponent, pathMatch: 'full' },
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
        console.error("Log MFE'sine ulaşılamadı. Sunucu kapalı olabilir:", err);
        throw err; 
      })
  } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
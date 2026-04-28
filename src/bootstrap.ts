import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { LogsComponent } from './app/logs/logs.component'; 

bootstrapApplication(LogsComponent, appConfig)
  .catch((err) => console.error(err));
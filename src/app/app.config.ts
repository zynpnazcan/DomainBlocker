import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    
    provideTranslateService({
      defaultLanguage: 'tr',
      loader: provideTranslateHttpLoader({
        prefix: 'http://localhost:4203/assets/i18n/',
        suffix: '.json'
      })
    })
  ]
};
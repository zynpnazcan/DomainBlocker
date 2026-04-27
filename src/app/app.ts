import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core'; 
import { DomainAdderComponent } from './domain-adder/domain-adder.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,      
    DomainAdderComponent 
  ],
  template: `<app-domain-adder></app-domain-adder>`
})
export class App {
  
  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('tr');
    this.translate.use('tr');
    window.addEventListener('message', (event) => {
    if (event.data.type === 'change-lang') {
      this.translate.use(event.data.lang); 
    }
  });
  }
}
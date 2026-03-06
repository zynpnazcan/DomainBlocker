import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DomainListComponent } from './domain-list/domain-list.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  imports: [DomainListComponent,TranslateModule ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('domain-blocker-frontend');
  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('tr');

    this.translate.use('tr'); 
  }
}

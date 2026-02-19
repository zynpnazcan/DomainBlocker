import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DomainListComponent } from './domain-list/domain-list';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,DomainListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('domain-blocker-frontend');
}

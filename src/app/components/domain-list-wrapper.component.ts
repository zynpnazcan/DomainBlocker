import { Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { loadRemoteModule } from '@angular-architects/module-federation';

@Component({
  selector: 'app-domain-list',
  standalone: false,
  template: `<ng-container #container></ng-container>`
})
export class DomainListWrapperComponent implements OnInit {
  @Input() src: string = '';
  @ViewChild('container', { read: ViewContainerRef, static: true }) container!: ViewContainerRef;

  async ngOnInit() {
    try {
      const module = await loadRemoteModule({
        type: 'module',
        remoteEntry: `${this.src}/remoteEntry.js`,
        exposedModule: './Component'
      });
      this.container.createComponent(module.DomainListComponent);
    } catch (e) {
      console.error('Liste yüklenemedi:', e);
    }
  }
}
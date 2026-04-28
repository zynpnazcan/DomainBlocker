import { Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { loadRemoteModule } from '@angular-architects/module-federation';

@Component({
  selector: 'app-domain-adder',
  standalone: false,
  template: `<ng-container #container></ng-container>`
})
export class DomainAdderWrapperComponent implements OnInit {
  @Input() src: string = '';
  @ViewChild('container', { read: ViewContainerRef, static: true }) container!: ViewContainerRef;

  async ngOnInit() {
    try {
      //gidip 4201 deki dosyayı okuyor
      const module = await loadRemoteModule({
        type: 'module',
        remoteEntry: `${this.src}/remoteEntry.js`,
        exposedModule: './Component'
      });
      this.container.createComponent(module.DomainAdderComponent);
    } catch (e) {
      console.error('Adder yüklenemedi:', e);
    }
  }
}
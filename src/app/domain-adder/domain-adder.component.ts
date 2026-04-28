import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { DomainService } from '../domain.service';

@Component({
  selector: 'app-domain-adder',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, TranslateModule],
  templateUrl: './domain-adder.component.html'
})
export class DomainAdderComponent {
  domainForm: FormGroup;
  constructor(private fb: FormBuilder, private domainService: DomainService) {
    this.domainForm = this.fb.group({
      domainInput: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/)]]
    });
  }

  addDomain() {
    if (this.domainForm.valid) {
      this.domainService.blockDomains({ domainName: this.domainForm.value.domainInput }).subscribe({
        next: () => {
          this.domainForm.reset();
         
          window.dispatchEvent(new CustomEvent('window:refresh-domain-list'));
        }
      });
    }
  }
}
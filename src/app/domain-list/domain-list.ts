import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon'; 
import { MatCardModule } from '@angular/material/card'; 
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DomainService } from '../domain.service';
import { Domain } from '../models/domain.model'; 

@Component({
  selector: 'app-domain-list',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    MatTableModule,    
    MatButtonModule,   
    MatFormFieldModule, 
    MatInputModule,
    MatIconModule,
    MatCardModule,
    TranslateModule    
  ],
  templateUrl: './domain-list.html',
  styleUrl: './domain-list.css'
})

export class DomainListComponent implements OnInit { 
  domainForm: FormGroup;
  domains: Domain[] = []; 
  responseMessage: string = '';
  isSuccess: boolean = false;

  constructor(
    private fb: FormBuilder, 
    private domainService: DomainService,
    private translate: TranslateService 
  ) {
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/;
    this.domainForm = this.fb.group({
      domainInput: ['', [Validators.required, Validators.pattern(domainRegex)]]
    });
  }

  ngOnInit() { this.loadDomains(); }

  loadDomains() {
    this.domainService.getAllDomains().subscribe(data => { this.domains = data; });
  }

  addDomain() {
  if (this.domainForm.valid) {
    const newDomain: Domain = { domainName: this.domainForm.value.domainInput };
    this.domainService.blockDomains(newDomain).subscribe({
      next: () => {
        this.isSuccess = true;
        this.responseMessage = this.translate.instant('DOMAIN_PAGE.MESSAGES.SUCCESS_ADD');
        this.domainForm.reset();
        this.loadDomains();
        this.autoClearMessage();
      },
      error: (err) => { 
        this.isSuccess = false;
        if (err.error && typeof err.error === 'string') {
          this.responseMessage = err.error;
        } else if (err.error && err.error.message) {
          this.responseMessage = err.error.message;
        } else {
          this.responseMessage = this.translate.instant('DOMAIN_PAGE.MESSAGES.ERROR_ADD');
        }
        
        this.autoClearMessage();
      }
    });
  }
}

  removeDomain(selectedDomain: Domain) {
  
  const confirmMsg = this.translate.instant('DOMAIN_PAGE.MESSAGES.CONFIRM_DELETE', { 
    domain: selectedDomain.domainName
  });

  if (window.confirm(confirmMsg)) {
    this.domainService.unblockDomains(selectedDomain).subscribe({
      next: () => {
        this.isSuccess = true;
        this.responseMessage = this.translate.instant('DOMAIN_PAGE.MESSAGES.SUCCESS_DELETE', { 
          domain: selectedDomain.domainName 
        });
        this.loadDomains();
        this.autoClearMessage();
      },
      error: () => {
        this.isSuccess = false;
        this.responseMessage = this.translate.instant('DOMAIN_PAGE.MESSAGES.ERROR_DELETE');
        this.autoClearMessage();
      }
    });
  }
}

  private autoClearMessage() {
    setTimeout(() => {
      this.responseMessage = '';
    }, 4000);
  }
}
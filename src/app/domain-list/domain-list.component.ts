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
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component'; 
import { FormsModule } from '@angular/forms';


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
    TranslateModule ,
    FormsModule  
  ],
  templateUrl: './domain-list.component.html',
  styleUrl: './domain-list.component.css'
})

export class DomainListComponent implements OnInit { 
  domainForm: FormGroup;
  domains: Domain[] = []; 
  responseMessage: string = '';
  isSuccess: boolean = false;

  constructor(
    private fb: FormBuilder, 
    private domainService: DomainService,
    private dialog: MatDialog,
    private translate: TranslateService 
  ) {
    this.translate.setDefaultLang('en');
    this.translate.use('tr');
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/;
    this.domainForm = this.fb.group({
      domainInput: ['', [Validators.required, Validators.pattern(domainRegex)]]
    });
  }
  
  switchLanguage(lang: string) {
    this.translate.use(lang); 
  }

  ngOnInit() { this.loadDomains(); }

  
  loadDomains() {
    this.domainService.getAllDomains().subscribe(data => { this.domains = data; });
  }
  searchText:string='';

 get filteredDomains() {
  return this.domains.filter(domain => {
    const search = this.searchText.toLowerCase();
    const nameMatch = domain.domainName.toLowerCase().includes(search);
    const descMatch = domain.description?.toLowerCase().includes(search); 
    
    return nameMatch || descMatch;
  });
}

addDomain() {
  if (this.domainForm.valid) {
    const domainData = { domainName: this.domainForm.value.domainInput };
    
    this.domainService.blockDomains(domainData).subscribe({
    next: (res: string[]) => {
  const fullMessage = res[0]; 
  const serverKey = fullMessage.substring(fullMessage.lastIndexOf(':') + 1).trim();

  const serverOutput = this.translate.instant('DOMAIN_PAGE.MESSAGES.' + serverKey);
  const baseMessage = this.translate.instant('DOMAIN_PAGE.MESSAGES.SUCCESS_ADD');
  
  
  this.responseMessage = `${baseMessage} (${serverOutput})`;
  this.isSuccess = true;

  this.loadDomains();
  this.domainForm.reset();
  this.autoClearMessage();
},
      error: (err) => {

        const errorKey = err.error?.message || 'GENERIC_ERROR';
        const translatedError = this.translate.instant('DOMAIN_PAGE.MESSAGES.' + errorKey);
        const errorLabel = this.translate.instant('DOMAIN_PAGE.MESSAGES.ERROR_LABEL');
        this.responseMessage = `${errorLabel}: ${translatedError}`;
        this.isSuccess = false;
        this.autoClearMessage();
      }
    });
  }
}
removeDomain(domain: Domain) {
  
  const confirmMessage = this.translate.instant('DOMAIN_PAGE.MESSAGES.CONFIRM_DELETE', { 
    domain: domain.domainName 
  });

  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    width: '400px',
    data: { message: confirmMessage }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result === true) {
      this.domainService.unblockDomains(domain).subscribe({
        next: (serverKey: string) => {
          
          const serverOutput = this.translate.instant('DOMAIN_PAGE.MESSAGES.' + serverKey);
        
          const baseMessage = this.translate.instant('DOMAIN_PAGE.MESSAGES.SUCCESS_DELETE', { 
            domain: domain.domainName 
          });

      
          this.responseMessage = `${baseMessage} (${serverOutput})`;
          this.isSuccess = true;
          
          this.loadDomains(); 
          this.autoClearMessage();
        },
        error: (err) => {
          const errorMsg = err.error?.message || 'Error';
          this.responseMessage = `Hata: ${errorMsg}`;
          this.isSuccess = false;
          this.autoClearMessage();
        }
      });
    }
  });
}
showSnackBar(messageKey: string, domainName?: string) {
 
  const translationKey = `DOMAIN_PAGE.MESSAGES.${messageKey}`;
  
  this.responseMessage = this.translate.instant(translationKey, { domain: domainName });


  setTimeout(() => {
    this.responseMessage = '';
  }, 3000);
}

  private autoClearMessage() {
    setTimeout(() => {
      this.responseMessage = '';
    }, 4000);
  }
}
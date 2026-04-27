import { Component, OnInit, OnDestroy } from '@angular/core'; 
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';

import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { DomainService } from '../domain.service';
import { NmuActionTypes } from '../shared/models/nmu-events';

// i18n Loader
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'http://localhost:4201/assets/i18n/', '.json');
}

@Component({
  selector: 'app-domain-adder',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatCardModule, 
    MatFormFieldModule, MatInputModule, MatButtonModule, 
    MatIconModule, TranslateModule
  ],
  providers: [
    {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient]
    },
    TranslateService
  ],
  templateUrl: './domain-adder.component.html',
  styleUrls: ['./domain-adder.component.css']
})
export class DomainAdderComponent implements OnInit, OnDestroy { 
  domainForm: FormGroup;
  responseMessage: string = ''; 
  isSuccess: boolean = false;   

  private messageListener = (event: MessageEvent) => {
    if (event.data && event.data.type === NmuActionTypes.CHANGE_LANG) {
      const selectedLang = event.data.payload || event.data.lang;
      this.translate.use(selectedLang);
      console.log(`MFE1: Dil ${selectedLang} olarak güncellendi. ✅`);
    }
  };

  constructor(
    private fb: FormBuilder, 
    private domainService: DomainService,
    private translate: TranslateService 
  ) {
    this.domainForm = this.fb.group({
      domainInput: ['', [
        Validators.required, 
        // Kurumsal regex standardı
        Validators.pattern(/^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/)
      ]]
    });

    this.translate.setDefaultLang('tr');
    this.translate.use('tr');
  }

  ngOnInit() {
    window.addEventListener('message', this.messageListener);
  }

  ngOnDestroy() {
    window.removeEventListener('message', this.messageListener);
  }

  addDomain() {
    if (this.domainForm.valid) {
      // 🚀 1. GÜVENLİK: Backend artık 'string[]' (Liste) bekliyor!
      const domainsToBlock = [this.domainForm.value.domainInput];
      
      this.domainService.blockDomains(domainsToBlock).subscribe({
        next: () => {
          this.isSuccess = true;
          this.responseMessage = this.translate.instant('DOMAIN_PAGE.MESSAGES.SUCCESS_ADD');
          this.domainForm.reset();
      
          // 🚀 2. MFE İLETİŞİMİ: Liste MFE'sine "Yenilen" emri gönderiliyor
          console.log('MFE1: Yeni domain eklendi, MFE2 listesini yenilemesi için tetiklendi. 🔄');
          window.postMessage({ type: NmuActionTypes.REFRESH_LIST }, '*');
          
          this.autoClearMessage();
        },
        error: (err) => {
          this.isSuccess = false;
          console.error('Domain Ekleme Hatası (Backend):', err);
          
          // 🚀 3. AKILLI HATA YÖNETİMİ: GlobalExceptionHandler'dan gelen mesajı alıyoruz
          // Backend bize JSON içinde { message: "ERROR_ALREADY_EXISTS" } dönüyor
          const backendErrorKey = err.error?.message || 'GENERIC_ERROR';
          
          const errorLabel = this.translate.instant('DOMAIN_PAGE.MESSAGES.ERROR_LABEL');
          this.responseMessage = `${errorLabel}: ${this.translate.instant('DOMAIN_PAGE.MESSAGES.' + backendErrorKey)}`;
          
          this.autoClearMessage();
        }
      });
    }
  }

  private autoClearMessage() {
    setTimeout(() => { this.responseMessage = ''; }, 4000);
  }
}
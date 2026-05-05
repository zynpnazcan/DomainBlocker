import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';

import { TranslateLoader, TranslateModule, TranslateService ,TranslateStore} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { NmuActionTypes } from '../shared/models/nmu-events';
import { DomainService } from '../domain.service';
import { Domain } from '../models/domain.model';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-domain-list',
  standalone: true,
  imports: [
    CommonModule, FormsModule, MatTableModule, MatButtonModule,
    MatFormFieldModule, MatInputModule, MatIconModule, MatCardModule, TranslateModule
  ],
  templateUrl: './domain-list.component.html',
  styleUrl: './domain-list.component.css'
})
export class DomainListComponent implements OnInit, OnDestroy {
  domains: Domain[] = [];
  searchText: string = '';
  responseMessage: string = '';
  isSuccess: boolean = false;
  
  // --- YENİ EKLENEN SAYFALAMA DEĞİŞKENLERİ ---
  currentPage: number = 0;
  pageSize: number = 10;
  totalItems: number = 0;
  totalPages: number = 0;

  private messageListener = (event: MessageEvent) => {
    const message = event.data;
    if (!message || !message.type) return;

    if (message.type === NmuActionTypes.REFRESH_LIST) {
      console.log('MFE2: Liste yenileme tetiklendi. 🔄');
      this.loadDomains();
    }
    
    if (message.type === NmuActionTypes.CHANGE_LANG) {
      const lang = message.payload || message.lang; 
      console.log('MFE2: Dil senkronize ediliyor ->', lang);
      this.translate.use(lang);
    }
  };

  constructor(
    private domainService: DomainService,
    private dialog: MatDialog,
    private translate: TranslateService,
    private cdr: ChangeDetectorRef 
  ) {
    
  }

  ngOnInit() {
    this.loadDomains(); 
    window.addEventListener('message', this.messageListener);
  }

  ngOnDestroy() {
    window.removeEventListener('message', this.messageListener);
  }

  loadDomains() {
    this.domainService.getAllDomains(this.currentPage, this.pageSize, this.searchText).subscribe({
      next: (response: any) => { 
        // Backend'den gelen JSON'ı (Map) parçalayıp değişkenlerimize atıyoruz
        this.domains = response.domains;       
        this.currentPage = response.currentPage; 
        this.totalItems = response.totalItems;   
        this.totalPages = response.totalPages;   
        this.cdr.detectChanges(); 
      },
      error: (err: any) => console.error('Veriler çekilemedi:', err)
    });
  }
  //  Yeni Arama Metodu Ekle:
  onSearch() {
    this.currentPage = 0; // Arama yapılınca her zaman 1. sayfadan başlamalı
    this.loadDomains();
  }
  // --- YENİ EKLENEN SAYFA DEĞİŞTİRME METODU ---
  changePage(newPage: number) {
    if (newPage >= 0 && newPage < this.totalPages) {
      this.currentPage = newPage;
      this.loadDomains(); // Yeni sayfa numarasıyla backend'den veriyi tekrar çek
    }
  }

  //get filteredDomains() {
   // const search = this.searchText.toLowerCase().trim();
   // if (!search) return this.domains;
    //return this.domains.filter(domain => domain.domainName.toLowerCase().includes(search));
 // }

  removeDomain(domain: Domain) {
    const confirmMessage = this.translate.instant('DOMAIN_PAGE.MESSAGES.CONFIRM_DELETE', { domain: domain.domainName });

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { message: confirmMessage }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.domainService.unblockDomains(domain).subscribe({
          next: () => {
            this.isSuccess = true;
            this.responseMessage = this.translate.instant('DOMAIN_PAGE.MESSAGES.SUCCESS_DELETE', { domain: domain.domainName });
            this.loadDomains();
            this.autoClearMessage();
          },
          error: () => {
            this.isSuccess = false;
            this.responseMessage = 'Silme işlemi başarısız oldu.';
            this.autoClearMessage();
          }
        });
      }
    });
  }

  private autoClearMessage() {
    setTimeout(() => { this.responseMessage = ''; }, 4000);
  }
}
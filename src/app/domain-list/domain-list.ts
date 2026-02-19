import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomainService } from '../domain.service';

@Component({
  selector: 'app-domain-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './domain-list.html',
  styleUrl: './domain-list.css'
})
export class DomainListComponent implements OnInit { 
  domainForm: FormGroup;
  domains: any[] = []; 

  constructor(private fb: FormBuilder, private domainService: DomainService) {
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/;

    this.domainForm = this.fb.group({
      domainInput: ['', [Validators.required, Validators.pattern(domainRegex)]]
    });
  }

  
  ngOnInit() {
    this.loadDomains();
  }

  loadDomains() {
    this.domainService.getAllDomains().subscribe(data => {
      this.domains = data; 
    });
  }
responseMessage: string = '';
isSuccess: boolean = false;

  addDomain() {
   const domain = this.domainForm.value.domainInput;
  this.domainService.blockDomains(domain).subscribe({
    next: (res) => {
      this.isSuccess = true;
      this.responseMessage = "Domain başarıyla engellendi!"; // 
      this.loadDomains(); 
    },
    error: (err) => {
  this.isSuccess = false;
  this.responseMessage = err.error?.message || "Sunucuyla bağlantı kurulamadı.";
}
  });
  }

 
  removeDomain(domainName: string) {
    const confirmDelete = window.confirm(`${domainName} alan adının engelini kaldırmak istediğinize emin misiniz?`);
    if(confirmDelete){
      this.domainService.unblockDomains(domainName).subscribe({
      next:(response)=>{
        this.responseMessage=`${domainName} için engel başarıyla kaldırıldı.`;
         this.loadDomains(); 
      },
      error: (err) =>{
        this.isSuccess=false;
        this.responseMessage='Engel kaldırılırken bir hata oluştu!';
    
     },
    });
    }
   
  }
}
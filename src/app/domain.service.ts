import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Domain } from './models/domain.model';

@Injectable({ providedIn: 'root' })
export class DomainService {
  private apiUrl = 'http://localhost:8080/api/domain-block';
  constructor(private http: HttpClient) {}

  getAllDomains(): Observable<Domain[]> {
    return this.http.get<Domain[]>(`${this.apiUrl}/all`);
  }

  blockDomains(domain: Domain): Observable<any> {
   const requestBody = {
    domains: [domain.domainName], 
  };
    return this.http.post(this.apiUrl, requestBody);
  }

  unblockDomains(domain: Domain): Observable<string> {
    return this.http.delete(`${this.apiUrl}/unblock`, { 
      params: { domain: domain.domainName }, 
      responseType: "text" 
    });
  } 
}
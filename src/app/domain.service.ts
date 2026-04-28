import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'; 

import { Domain } from './models/domain.model'; 

export interface ApiResponse<T> {
  status: string;
  message?: string;
  details?: T;
  detail?: string;
}

@Injectable({
  providedIn: 'root'
})
export class DomainService {
  
  private apiUrl = `${environment.apiUrl}/domain-block`;

  constructor(private http: HttpClient) {}

  getAllDomains(): Observable<Domain[]> {
    return this.http.get<Domain[]>(`${this.apiUrl}/all`);
  }

  unblockDomains(domain: Domain): Observable<ApiResponse<string>> {
    return this.http.delete<ApiResponse<string>>(`${this.apiUrl}/unblock?domain=${domain.domainName}`);
  }

  blockDomains(domains: string[]): Observable<ApiResponse<string[]>> {
    return this.http.post<ApiResponse<string[]>>(this.apiUrl, { domains });
  }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DomainService {
  private apiUrl='http://localhost:8080/api/domain-block';
  constructor(private http: HttpClient) {}

  getAllDomains():Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}/all`);
  
  }

  blockDomains(domainName: string) {
  const requestBody = {
    domains: [domainName] 
  };

  return this.http.post(this.apiUrl, requestBody);
}

  unblockDomains(domain:string):Observable<string>
{
  return this.http.delete(`${this.apiUrl}/unblock`, { params: { domain }, responseType:"text"});
} 
 }


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface SystemLog {
  id: number;
  timestamp: string;
  level: string;
  domainName: string;
  actionCode: string;
  moduleName: string;
}

@Injectable({ providedIn: 'root' })
export class LogService {
   private apiUrl = `${environment.apiUrl}/logs`;

  constructor(private http: HttpClient) {}

  getLogs(): Observable<SystemLog[]> {
    return this.http.get<SystemLog[]>(this.apiUrl);
  }
}
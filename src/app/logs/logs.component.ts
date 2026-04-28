import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { HttpClientModule } from '@angular/common/http';
import { LogService, SystemLog } from './log.service';
import { TranslateModule,TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-logs',
  standalone: true,
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css'],
  imports: [CommonModule, HttpClientModule,TranslateModule] 
})
export class LogsComponent implements OnInit {
  logs: SystemLog[] = [];

  constructor(
    private logService: LogService,
    private translate: TranslateService
  )
   {
    this.translate.setDefaultLang('tr');
    this.translate.use('tr');
  }

  ngOnInit(): void {
    this.refreshLogs();
  }

  refreshLogs() {
    this.logService.getLogs().subscribe({
      next: (data) => this.logs = data,
      error: (err) => console.error('Loglar çekilemedi:', err)
    });
  }
}
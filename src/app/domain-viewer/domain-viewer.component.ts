import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { DomainService } from '../domain.service';

@Component({
  selector: 'app-domain-viewer',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule, MatIconModule, MatButtonModule, MatInputModule],
  templateUrl: './domain-viewer.component.html'
})
export class DomainViewerComponent implements OnInit {
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['domainName', 'appliedAt', 'actions'];

  constructor(private domainService: DomainService) {}

  ngOnInit() { this.loadDomains(); }

  @HostListener('window:refresh-domain-list')
  refresh() { this.loadDomains(); }

  loadDomains() {
    this.domainService.getAllDomains().subscribe(list => this.dataSource.data = list);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  remove(domain: any) {
    this.domainService.unblockDomains(domain).subscribe(() => this.loadDomains());
  }
}
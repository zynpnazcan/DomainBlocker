import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DomainListComponent } from './domain-list.component';
import { provideHttpClient } from '@angular/common/http'; 
import { TranslateModule } from '@ngx-translate/core';   
import { MatDialogModule } from '@angular/material/dialog'; 

describe('DomainListComponent', () => {
  let component: DomainListComponent;
  let fixture: ComponentFixture<DomainListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
  imports: [DomainListComponent, TranslateModule.forRoot(), MatDialogModule],
  providers: [provideHttpClient()]
}).compileComponents();

    fixture = TestBed.createComponent(DomainListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainViewerComponent } from './domain-viewer.component';

describe('DomainViewerComponent', () => {
  let component: DomainViewerComponent;
  let fixture: ComponentFixture<DomainViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DomainViewerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DomainViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

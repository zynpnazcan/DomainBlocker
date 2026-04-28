import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainAdderComponent } from './domain-adder.component';

describe('DomainAdderComponent', () => {
  let component: DomainAdderComponent;
  let fixture: ComponentFixture<DomainAdderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DomainAdderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DomainAdderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';
import { App } from './app'; 
import { provideHttpClient } from '@angular/common/http'; 
import { TranslateModule } from '@ngx-translate/core';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        App, 
        TranslateModule.forRoot()
      ],
      providers: [
        provideHttpClient() 
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
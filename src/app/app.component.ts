import { Component, OnInit, OnDestroy } from '@angular/core';
import { NmuActionTypes } from './shared/models/nmu-events';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: false, 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  currentLang: string = 'tr';

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('tr');
    this.translate.use('tr');
  }
 
  ngOnInit() {
    window.addEventListener('message', this.messageListener);
  }

  ngOnDestroy() {
    window.removeEventListener('message', this.messageListener);
  }

  private messageListener = (event: MessageEvent) => {
    if (event.data && event.data.type === NmuActionTypes.REFRESH_LIST) {
      console.log('Shell: Veri değişimi algılandı, MFE2 kendi listesini yeniledi.');
    }
  };

  switchLang(lang: string) {
    this.currentLang = lang;
    this.translate.use(lang);
    
    window.postMessage({ type: NmuActionTypes.CHANGE_LANG, payload: lang }, '*');
    console.log(`Shell: Tüm sisteme dilin '${lang}' olduğu anons edildi. 🌍`);
  }
}
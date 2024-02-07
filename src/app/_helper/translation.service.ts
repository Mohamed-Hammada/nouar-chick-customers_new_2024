import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  constructor(private translateService: TranslateService) {
    const languageCode = localStorage.getItem('langCode') || 'ar'; // Default to 'ar' if no language code found
    this.translateService.setDefaultLang(languageCode);
    this.translateService.use(languageCode);
  }

  changeLanguage(languageCode: string) {
    localStorage.setItem('langCode', languageCode);
    this.translateService.use(languageCode);
  }
}

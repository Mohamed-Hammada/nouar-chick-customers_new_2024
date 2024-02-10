import { Injectable, Renderer2, RendererFactory2, afterNextRender, afterRender } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private renderer: Renderer2;


  constructor(private translateService: TranslateService,private rendererFactory: RendererFactory2) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    if(typeof localStorage !== 'undefined'){
    const languageCode = localStorage.getItem('langCode') || 'ar'; // Default to 'ar' if no language code found
    this.translateService.setDefaultLang(languageCode);
    this.translateService.use(languageCode);
    // this.setDirection(languageCode);
    }
  }

  changeLanguage(languageCode: string) {
    if(typeof localStorage !== 'undefined'){
    localStorage.setItem('langCode', languageCode);
    this.translateService.use(languageCode);
    }
  }

  private setDirection(languageCode: string) {
    if(typeof localStorage !== 'undefined'){
    const isRtl = languageCode === 'ar' || languageCode === 'he'; // Add more languages as needed
    const direction = isRtl ? 'rtl' : 'ltr';
    this.renderer.setAttribute(document.body, 'dir', direction);
    }
  }

  instant(key: string): string {
    return this.translateService.instant(key);
  }
}

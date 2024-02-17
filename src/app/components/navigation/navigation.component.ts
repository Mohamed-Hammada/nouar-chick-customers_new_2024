import { Component, Inject, OnDestroy, OnInit, computed, signal } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { DOCUMENT } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CustomSideNavComponent } from "./custom-side-nav/custom-side-nav.component";
import { CommonModule } from '@angular/common';
import { CustomeSearchComponent } from "../custome-search/custome-search.component";
import { fromEvent , Observable, Subscription } from 'rxjs';
import { TranslationService } from '../../_helper/translation.service';
@Component({
    selector: 'app-navigation',
    standalone: true,
    templateUrl: './navigation.component.html',
    styleUrl: './navigation.component.scss',
    imports: [CommonModule, MatToolbarModule,
        MatSidenavModule, MatIconModule,
        MatButtonModule, RouterOutlet,
        CustomSideNavComponent, CustomeSearchComponent]
})
export class NavigationComponent implements OnInit , OnDestroy {
  collapsed = signal(false);
  darkTheme = signal(false);
  langCode = signal('ar');
  resizeObservable$!: Observable<Event>;
  resizeSubscription$!: Subscription;
  sidenaveWidth = computed(() => {
    // debugger
    const isSmallDevice = window.innerWidth <= 500; // Check for small devices
    return this.collapsed() ? (isSmallDevice ? '0' : '65px') : '250px';
  });

  opened = computed(() => {
    const isSmallDevice = window.innerWidth <= 500; // Check for small devices
    return this.collapsed() ? (isSmallDevice ? false : true) : true;
  })
  constructor(private breakpointObserver: BreakpointObserver, private translationService: TranslationService) {
    this.setCollapsedForScreenSize();
    const collapsedStore = localStorage.getItem('collapsed');
    if(collapsedStore){
      this.collapsed.set(collapsedStore == 'true');
    }
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      this.darkTheme.set(storedTheme === 'dark')
    }
    const currentLanguage = localStorage.getItem('langCode');
    this.langCode.set(currentLanguage || 'ar');
    this.loadTheme();
  }

  ngOnInit() {


    this.resizeObservable$ = fromEvent(window, 'resize')
    this.resizeSubscription$ = this.resizeObservable$.subscribe( evt => {
      // console.log('event: ', evt);
      const isSmallDevice = window.innerWidth <= 500; // Check for small devices
       
      this.sidenaveWidth.apply( this.collapsed() ? (isSmallDevice ? '0' : '65px') : '250px');
    });
  
}

 

  private setCollapsedForScreenSize() {
    this.breakpointObserver.observe([
      Breakpoints.Handset
    ]).subscribe(result => {
      if (result.matches) {
        this.collapsed.set(true);
       } else {
        this.collapsed.set(false);
       }
    });
  }

  toggleTheme() {
    this.darkTheme.set(!this.darkTheme());
    this.loadTheme();
  }

  loadTheme() {
    if (this.darkTheme()) {
      document.body.classList.add('theme-dark');
      document.body.classList.remove('theme-light'); // Fix the typo here
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.add('theme-light');
      document.body.classList.remove('theme-dark');
      localStorage.setItem('theme', 'light');
    }
  }


  toggleCollapse(){
    this.collapsed.set(!this.collapsed());
    localStorage.setItem('collapsed', this.collapsed() + "");
  }

  ngOnDestroy() {
    this.resizeSubscription$.unsubscribe()
  }

  onLinkClicked($event:any): void {
    // Update side nav width when a link is clicked
    // You can adjust the logic based on your requirements
    // debugger
    if($event){
      const isSmallDevice = window.innerWidth <= 500; // Check for small devices
      if(isSmallDevice){
        this.collapsed.set(true);
        this.sidenaveWidth.apply( this.collapsed() ? (isSmallDevice ? '0' : '65px') : '250px');
      
      }
    }
  }

  toggleLanguage() {
    const currentLanguage = localStorage.getItem('langCode');
    const newLanguage = currentLanguage === 'ar' ? 'en' : 'ar'; // Toggle between 'ar' and 'en'
    localStorage.setItem('langCode', newLanguage);
    this.langCode.set(newLanguage);
    this.translationService.changeLanguage(newLanguage);
  }

}

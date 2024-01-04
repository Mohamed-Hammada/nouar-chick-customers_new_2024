import { Component, Inject, OnInit, computed, signal } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { DOCUMENT } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CustomSideNavComponent } from "./custom-side-nav/custom-side-nav.component";
import { CommonModule } from '@angular/common';
import { sessionStorageStrategy} from '@ngneat/elf-persist-state';
@Component({
  selector: 'app-navigation',
  standalone: true,
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  imports: [CommonModule, MatToolbarModule,
    MatSidenavModule, MatIconModule,
    MatButtonModule, RouterOutlet,
    CustomSideNavComponent]
})
export class NavigationComponent implements OnInit {
  collapsed = signal(false);
  darkTheme = signal(false);
   constructor(private breakpointObserver: BreakpointObserver,@Inject(DOCUMENT) private document: Document) {
    debugger
    this.setCollapsedForScreenSize();
    debugger
    
  }
 async ngOnInit()  {
  const storedTheme = await  sessionStorageStrategy.getItem('theme');
  if (storedTheme) {
    this.darkTheme.set( storedTheme.subscribe  === 'dark')
  }
  this.loadTheme();
}

  sidenaveWidth = computed(() => this.collapsed() ? '65px' : '250px');

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
    this.darkTheme.set(!this.darkTheme()) ;
    this.loadTheme();
  }

  loadTheme() {
    if (this.darkTheme()) {
      this.document.body.classList.add('theme-dark');
      this.document.body.classList.remove('theme-light'); // Fix the typo here
      sessionStorageStrategy.setItem('theme',  {theme: 'dark'});
    } else {
      this.document.body.classList.add('theme-light');
      this.document.body.classList.remove('theme-dark');
      sessionStorageStrategy.setItem('theme',  {theme: 'light'});
    }
  }
}

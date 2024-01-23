import { Component, Inject, OnInit, afterNextRender, afterRender, computed, signal } from '@angular/core';
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
export class NavigationComponent {
  collapsed = signal(false);
  darkTheme = signal(false);
  constructor(private breakpointObserver: BreakpointObserver) {
    this.setCollapsedForScreenSize();
    afterRender(() => {
      const collapsedStore = localStorage.getItem('collapsed');
      if (collapsedStore) {
        this.collapsed.set(collapsedStore == 'true');
      }
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme) {
        this.darkTheme.set(storedTheme === 'dark')
      }
      this.loadTheme();
    })

  }


  sidenaveWidth  () {
    // debugger 
    if (typeof window !== 'undefined') {

        const isSmallDevice = window.innerWidth <= 500; // Check for small devices
        return this.collapsed() ? (isSmallDevice ? '0' : '65px') : '250px';
      }else{
        return '0px';
      }
      
 
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


  toggleCollapse() {
    this.collapsed.set(!this.collapsed());
    localStorage.setItem('collapsed', this.collapsed() + "");
  }
}

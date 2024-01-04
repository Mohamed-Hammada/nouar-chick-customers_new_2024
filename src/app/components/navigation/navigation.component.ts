import { Component, computed, signal } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CustomSideNavComponent } from "./custom-side-nav/custom-side-nav.component";
import { CommonModule } from '@angular/common';
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
export class NavigationComponent {
  collapsed = signal(false);
  constructor(private breakpointObserver: BreakpointObserver) {
    this.setCollapsedForScreenSize();
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
}

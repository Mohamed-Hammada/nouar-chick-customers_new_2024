import { Component, computed, signal } from '@angular/core';
import {  } from 'rxjs';
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
    imports: [CommonModule,MatToolbarModule, MatSidenavModule, MatIconModule, MatButtonModule, RouterOutlet, CustomSideNavComponent]
})
export class NavigationComponent {
  collapsed = signal(false);
  sidenaveWidth = computed(() => this.collapsed()? '65px' : '250px');

}

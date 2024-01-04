import { Component, Input, computed, signal } from '@angular/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list'
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
export type MenuItem = {
  icon: string,
  label: string,
  route: string
}

@Component({
  selector: 'app-custom-side-nav',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule,RouterOutlet,RouterLink,RouterLinkActive],
  templateUrl: './custom-side-nav.component.html',
  styleUrl: './custom-side-nav.component.scss'
})
export class CustomSideNavComponent {

  sidenavCollapsed = signal(false);
  @Input() set collapsed(val : boolean){
    this.sidenavCollapsed.set(val);
  }
  menuItems = signal<MenuItem[]>([
    {
      icon: 'dashboard',
      label: 'Dashboard',
      route: '/dashboard'
    },
    {
      icon: 'analytics',
      label: 'Analytics',
      route: '/analytics'
    },
    {
      icon: 'person',
      label: 'Customers',
      route: '/customers'
    },
    {
      icon: 'person_add',
      label: 'Add Customer',
      route: '/add-customer'
    },
    {
      icon: 'comments',
      label: 'Comments',
      route: '/comments'
    },
  ])

  profilePicSize = computed(() => this.sidenavCollapsed()? '32' : '100');
}

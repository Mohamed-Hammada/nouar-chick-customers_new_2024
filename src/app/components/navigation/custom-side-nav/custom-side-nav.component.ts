import { Component, EventEmitter, Input, Output, computed, signal } from '@angular/core';
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
  @Output() menuItemClicked = new EventEmitter<any>();


  @Input() set collapsed(val : boolean){
    this.sidenavCollapsed.set(val);
  }
  menuItems = signal<MenuItem[]>([
 
    {
      icon: 'person',
      label: 'Customers',
      route: '/customers'
    },
    {
      label: 'Products',
      icon: 'local_grocery_store',
      route: '/products'
    },
    {
      label: 'Statment History',
      icon: 'history',
      route: '/statement-history'
    },
   
   
    // {
    //   label: 'Financial',
    //   icon: 'attach_money',
    //   route: '/financial'
    // },
    {
      icon: 'dashboard',
      label: 'Dashboard',
      route: '/dashboard'
    },
    // {
    //   icon: 'analytics',
    //   label: 'Analytics',
    //   route: '/analytics'
    // },
    // {
    //   icon: 'person_add',
    //   label: 'Add Customer',
    //   route: '/add-customer'
    // },
    // {
    //   icon: 'comments',
    //   label: 'Comments',
    //   route: '/comments'
    // },
    {
      label: 'Logout',
      icon: 'logout',
      route: '/logout'
    },
  ])

  profilePicSize = computed(() => this.sidenavCollapsed()? '32' : '100');

  onMenuItemClick(item: any): void {
    // Emit the clicked item as an event
    // debugger
    this.menuItemClicked.emit(item);
  }

}

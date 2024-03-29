import { Component, EventEmitter, Input, Output, computed, signal } from '@angular/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list'
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TranslationService } from '../../../_helper/translation.service';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { Direction } from '@angular/cdk/bidi';

export type MenuItem = {
  icon: string,
  label: string,
  route: string
}

@Component({
  selector: 'app-custom-side-nav',
  standalone: true,
  imports: [CommonModule, MatListModule,TranslateModule,MatIconModule,RouterOutlet,RouterLink,RouterLinkActive],
  templateUrl: './custom-side-nav.component.html',
  styleUrl: './custom-side-nav.component.scss'
})
export class CustomSideNavComponent {

  sidenavCollapsed = signal(false);
  @Output() menuItemClicked = new EventEmitter<any>();

  direction: Direction = 'rtl';
  @Input() set collapsed(val : boolean){
    this.sidenavCollapsed.set(val);
  }
  menuItems = signal<MenuItem[]>([
    {
      icon: 'person',
      label: 'customers',
      route: '/customers'
    },
    {
      label: 'products',
      icon: 'local_grocery_store',
      route: '/products'
    },
    {
      label: 'statment_history',
      icon: 'history',
      route: '/statement-history'
    },
   
    {
      label: 'analytics',
      route: '/analytics',
      icon: 'analytics'
    },
    // {
    //   label: 'Financial',
    //   icon: 'attach_money',
    //   route: '/financial'
    // },
    // {
    //   icon: 'dashboard',
    //   label: 'Dashboard',
    //   route: '/dashboard'
    // },
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
      label: 'logout',
      icon: 'logout',
      route: '/logout'
    },
  ])

  profilePicSize = computed(() => this.sidenavCollapsed()? '32' : '100');

  constructor(private translationService: TranslationService) {
    this.direction = this.translationService.currentLangDirection();
  } 

  onMenuItemClick(item: any): void {
    // Emit the clicked item as an event
    // debugger
    this.menuItemClicked.emit(item);
  }

}

import { Component, OnInit } from '@angular/core';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { KeycloakService } from 'keycloak-angular';
import { Location } from '@angular/common';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent implements OnInit{
  constructor(private confirmationDialogService: ConfirmationDialogService,
    private keycloakService: KeycloakService,
    private location: Location) { }
  ngOnInit(): void {
    this.confirmationDialogService
      .openConfirmationDialog('Are you sure you want to Logout?')
      .subscribe((result) => {
        if (result) {
          // User confirmed deletion, proceed with delete
          this.keycloakService.logout(`http://${window.location.host}`);
        }else{
          
          this.location.back();
        }
      });
   }
}

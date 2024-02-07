import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NotificationService } from '../../../components/notification.service';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Customer, CustomersService } from '../customers.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { KeycloakService } from 'keycloak-angular';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../../_helper/translation.service';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

@Component({
  selector: 'app-create-update-customers',
  standalone: true,
  imports: [CommonModule , FormsModule, MatButtonModule, MatIconModule, MatCardModule, MatToolbarModule,
    ReactiveFormsModule, MatFormFieldModule, MatInputModule,MatCheckboxModule,TranslateModule],
  templateUrl: './create-update-customers.component.html',
  styleUrl: './create-update-customers.component.scss'
})
export class CreateUpdateCustomersComponent implements OnInit,AfterViewInit{

  customer: Customer = {};
  readOnly:boolean = false;
  @ViewChild('descriptionTextarea') descriptionTextarea: ElementRef | undefined;
  data:any;
  isAdminUser:boolean = false;
  customerForm!: FormGroup;
  constructor(private fb: FormBuilder,
    private customerService: CustomersService,
    private translationService: TranslationService,
    private keycloakService: KeycloakService,
    private notificationService: NotificationService,
    private router: Router) {
      const navigation = this.router.getCurrentNavigation();
      const state = navigation?.extras.state;
      this.data = state;
  
      this.customer = this.data?.content||{}; 
    if(this.data?.readOnly){
      this.readOnly = true;
    }
  }



  ngOnInit(): void {
    const isLoggedIn = this.keycloakService.isLoggedIn();
    if (!isLoggedIn)
      this.keycloakService.login();

    const userRoles = this.keycloakService.getUserRoles();
    this.isAdminUser = userRoles.includes('admin');

    this.customerForm = this.fb.group({
      id: [this.customer?.id || null],
      code_id: [this.customer?.code_id || null],
      name: [this.customer?.name || '', Validators.required],
      visible_to_normal_users: new FormControl(false) ,
      contact_details: [this.customer?.contact_details || ''],
    });
  }

  ngAfterViewInit(): void {
    if (this.descriptionTextarea) {
      const target = this.descriptionTextarea.nativeElement as HTMLTextAreaElement;
      target.style.height = "0px";
      target.style.height = (target.scrollHeight + 25) + "px";
    }
  }
  
  autoGrowTextZone(e: Event) {
    const target = (e as any)?.target as HTMLElement | undefined;
    if (target) {
      target.style.height = "0px";
      target.style.height = (target.scrollHeight + 25) + "px";
    }
  }
  onSubmit(): void {
    if (this.customer?.id) {
      // Update existing customer
      const updatedCustomer: Customer = { ...this.customer, ...this.customerForm.value };
      this.customerService.updateCustomer(updatedCustomer).subscribe(response => {
        // Handle update success
        this.router.navigate(['/customers']);
        this.notificationService.success('Customer updated successfully');
      }, error => {
        // Handle update error
        console.error('Update failed:', error);
        this.notificationService.error('Update failed');
      });
    } else {
      // Add new customer
      const newCustomer: Customer = this.customerForm.value;
      this.customerService.createCustomer(newCustomer).subscribe(response => {
        // Handle add success
        this.router.navigate(['/customers']);
        this.notificationService.success('Customer added successfully');
      }, error => {
        // Handle add error
        console.error('Add failed:', error);
        this.notificationService.error('Create failed');

      });
    }
  }
}

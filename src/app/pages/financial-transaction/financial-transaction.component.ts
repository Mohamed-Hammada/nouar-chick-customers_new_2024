import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LanguageService } from '../../_helper/language.service';
import { DataService } from '../../_helper/data.service';
import { CustomeSearchComponent } from "../../components/custome-search/custome-search.component";
import { FinancialTransactionPage, FinancialTransactionService } from './financial-transaction.service';
import { NotificationService } from '../../components/notification.service';
import { ConfirmationDialogService } from '../../components/confirmation-dialog/confirmation-dialog.service';
import { Customer } from '../customers/customers.service';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list'
import { CreateUpdateCustomersComponent } from "../customers/create-update-customers/create-update-customers.component";
@Component({
  selector: 'app-financial-transaction',
  standalone: true,
  templateUrl: './financial-transaction.component.html',
  styleUrl: './financial-transaction.component.scss',
  imports: [CommonModule, MatIconModule, MatListModule,
    MatCardModule, MatToolbarModule, MatButtonModule,
    CustomeSearchComponent, CreateUpdateCustomersComponent,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class FinancialTransactionComponent implements OnInit {
  customerForm!: FormGroup;

  customer: Customer = {};
  cards$!: Observable<FinancialTransactionPage>;



  constructor(private service: FinancialTransactionService,
    private fb: FormBuilder,
    private confirmationDialogService: ConfirmationDialogService,
    private notificationService: NotificationService,
    private router: Router,
    private languageService: LanguageService,
    private dataService: DataService) {
    if (this.dataService.data)
      this.customer = this.dataService.data.content;
    this.languageService.setDefaultLanguage();
 
   }
  ngOnInit(): void {
    this.initForm();

    this.loadData();

  }

  initForm(): void {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    this.customerForm = this.fb.group({
      id: [this.customer.id], // You can set default values or leave them empty
      code_id: [this.customer.code_id],
      name: [this.customer.name],
      start: [yesterday],
      end: [today]
    });
  }
 



  // In your component class
  myTrackByFunc(index: number, card: any): number {
    return card.id; // Assuming 'id' is a unique identifier for each card
  }

  addChildHandler(card?: any, readOnly: boolean = false): void {
    if (card) {
      this.dataService.setData({ readOnly: readOnly, content: card });
    } else {
      this.dataService.setData({});
    }

    this.router.navigate(['/create-update-financial']);
  }

  delete(card: any): void {
    this.service.deleteFinancialTransaction(card.id).subscribe(response => {
      this.loadData();
      // Handle update success
      this.notificationService.success('Customer Deleted successfully');
    }, error => {
      // Handle update error
      console.error('Delete failed:', error);
      this.notificationService.error('Delete failed');
    });
  }

  handleDelete(card: any): void {
    this.confirmationDialogService
      .openConfirmationDialog('Deleting the product will also delete associated customer records. Exercise caution before proceeding?')
      .subscribe((result) => {
        if (result) {
          // User confirmed deletion, proceed with delete
          this.delete(card);
        }
      });

  }
  loadData() {    // Custom validation for fromDate and toDate
    const fromDate = this.customerForm?.get('start')?.value as Date;
    const toDate = this.customerForm?.get('end')?.value as Date;

    if (fromDate && toDate && fromDate > toDate) {
      // Handle validation error, for example, show an error message
      console.log("Validation Error: From Date must be less than or equal to To Date");
      this.notificationService.error('Date From Must be less than or equal to Date To');

    } else {
      // Proceed with the load action logic
      // ...
      console.log("Load Action Executed");
      this.cards$ = this.service.getFinancialTransactions(this.customer?.id , fromDate,toDate);
    }
  }
}

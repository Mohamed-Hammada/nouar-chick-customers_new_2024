import { Component } from '@angular/core';
import { FinancialTransaction } from '../financial-transaction.service';
import { FormsModule } from '@angular/forms'; // <-- Import FormsModule
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-create-update-financial-transaction',
  standalone: true,
  imports: [   
    CommonModule,
    FormsModule, // <-- Add FormsModule here
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
],
  templateUrl: './create-update-financial-transaction.component.html',
  styleUrl: './create-update-financial-transaction.component.scss'
})
export class CreateUpdateFinancialTransactionComponent {
  transactions: FinancialTransaction[] = [];
  constructor() { 
    this.addTransaction()
  } 
  addTransaction() {
    this.transactions.push({
      id: undefined, // ID is set to undefined to hide it in the form
      statement: undefined,
      product: undefined,
      count: undefined,
      price: undefined,
      borrower: undefined,
      stock: undefined,
      total_borrower: undefined,
      total_stock: undefined
    });

  }
  
  onSubmit() {
    // save all transactions
  }
  
}

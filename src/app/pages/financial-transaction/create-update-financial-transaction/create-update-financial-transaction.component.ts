import { Component } from '@angular/core';
import { FinancialTransaction, FinancialTransactionService } from '../financial-transaction.service';
import { FormsModule } from '@angular/forms'; // <-- Import FormsModule
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { Observable, map } from 'rxjs';
import { CustomChipAutocompeleteComponentComponent } from "../../../components/custom-chip-autocompelete-component/custom-chip-autocompelete-component.component";
import { ProductPage, ProductService } from '../../products/product.service';
import { StatementHistoryService } from '../../statement-history/statement-history.service';
import { Customer } from '../../customers/customers.service';
import { DataService } from '../../../_helper/data.service';


export type FinancialTransactionDto = {
  id?: number;
  statement?: string;
  product?: string; // Assuming you have a Product type
  count?: number;
  price?: number;
  borrower?: number;
  stock?: number;
  total_borrower?: number;
  total_stock?: number;
  creation_date?: string; // Assuming you want to use a string representation for Instant
  modification_date?: string; // Assuming you want to use a string representation for Instant
}

@Component({
  selector: 'app-create-update-financial-transaction',
  standalone: true,
  templateUrl: './create-update-financial-transaction.component.html',
  styleUrl: './create-update-financial-transaction.component.scss',
  imports: [
    CommonModule,
    FormsModule, // <-- Add FormsModule here
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    CustomChipAutocompeleteComponentComponent
  ]
})
export class CreateUpdateFinancialTransactionComponent {

  statement_names: string[] = [];
  product_names: string[] = [];
  readOnly: boolean;
  transactions: FinancialTransactionDto[] = [];
  constructor(private productService: ProductService,
    private statementHistoryService: StatementHistoryService,
    private service: FinancialTransactionService, private dataServise: DataService) {
      this.readOnly =dataServise.data?.readOnly; 
    if (dataServise.data?.content) {
      this.fillTransaction();
    } else {
      this.addEmptyTransaction();
    }
  }

  fillTransaction(){
    this.addEmptyTransaction();
    this.transactions.push({
      id: this.dataServise.data?.content.id,
      statement: this.dataServise.data?.content.statement?.name,
      product: this.dataServise.data?.content.product?.name,
      count: this.dataServise.data?.content.count,
      price: this.dataServise.data?.content.price,
      borrower: this.dataServise.data?.content.borrower,
      stock: this.dataServise.data?.content.stock,
      total_borrower: this.dataServise.data?.content.total_borrower,
      total_stock: this.dataServise.data?.content.total_stock
    });
  }
  addEmptyTransaction() {
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

  filterStatement = (term: string): Observable<string[]> => {
    return this.statementHistoryService.searchStatementHistorys(term).pipe(
      map(response => {
        if (response && response.content) {
          return response.content
            .filter(row => row?.name !== undefined)
            .map(row => row.name as string);
        } else {
          return [];
        }
      })
    );
  }


  filterProduct = (term: string): Observable<string[]> => {
    return this.productService.searchProducts(term).pipe(
      map(response => {
        if (response && response.content) {
          return response.content
            .filter(row => row?.name !== undefined)
            .map(row => row.name as string);
        } else {
          return [];
        }
      })
    );
  }
  onSubmit() {
    // save all transactions
    console.log(this.transactions);
    console.log(this.dataServise.data?.customer);
  }

}

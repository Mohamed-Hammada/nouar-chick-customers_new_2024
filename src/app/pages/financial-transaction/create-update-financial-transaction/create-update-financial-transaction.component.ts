import { Component } from '@angular/core';
import { FinancialTransaction } from '../financial-transaction.service';
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
  transactions: FinancialTransaction[] = [];
  constructor( private productService: ProductService, private statementHistoryService : StatementHistoryService) { 
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
  }
  
}

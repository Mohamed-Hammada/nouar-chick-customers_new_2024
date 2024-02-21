import { Component } from '@angular/core';
import { FinancialTransaction, FinancialTransactionDto, FinancialTransactionService } from '../financial-transaction.service';
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
import { NotificationService } from '../../../components/notification.service';
import { NavigationExtras, Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { TranslationService } from '../../../_helper/translation.service';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';


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
    TranslateModule,
    MatInputModule,
    CustomChipAutocompeleteComponentComponent
  ]
})
export class CreateUpdateFinancialTransactionComponent {
  customer: Customer = {};
  statement_names: string[] = [];
  product_names: string[] = [];
  readOnly: boolean;
  transactions: FinancialTransactionDto[] = [];
  isEdit: boolean = false;
  data : any;
  constructor(private productService: ProductService,
    private notificationService: NotificationService,
    private translationService: TranslationService,
    private keycloakService: KeycloakService,
    private router: Router,
    private statementHistoryService: StatementHistoryService,
    private service: FinancialTransactionService) {
      const isLoggedIn = this.keycloakService.isLoggedIn();
      if (!isLoggedIn)
        this.keycloakService.login();
  


      const navigation = this.router.getCurrentNavigation();
      const state = navigation?.extras.state;
      this.data = state;
      this.readOnly =this.data?.readOnly; 
    if (this.data?.content) {
      this.fillTransaction();
      this.isEdit = true;
    } else {
      this.addEmptyTransaction();
    }
    this.customer = this.data?.customer;
  
  }

  fillTransaction(){
    this.transactions.push({
      id: this.data?.content.id,
      statement: this.data?.content.statement?.name,
      product: this.data?.content.product?.name,
      count: this.data?.content.count,
      price: this.data?.content.price,
      borrower: this.data?.content.borrower,
      stock: this.data?.content.stock,
      total_borrower: this.data?.content.total_borrower,
      total_stock: this.data?.content.total_stock
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
  
    if (this.customer?.id) {
      if(this.isEdit){
        // Update existing customer
        this.service.updateFinancialTransaction(this.customer?.id , this.transactions[0])
        .subscribe(response => {
          if (response && response.content === 'ok') {
            // Handle update success



            const navigationExtras: NavigationExtras = {
              state:  { content: this.customer}
            };
            this.router.navigate(['/financial'] , navigationExtras);
            this.notificationService.success('Updated successfully');
          }else{
            debugger
            this.notificationService.error('Update Failed Something Wrong');    
          }  
      }, error => {
        // Handle update error
        console.error('Update Failed:', error);
        this.notificationService.error('Update Failed ' + error);
        });
      }else{
        // Update existing customer
       this.service.createFinancialTransaction(this.customer?.id , this.transactions)
       .subscribe(response => {
        if (response && response.content === 'ok') {
          // Handle update success
          const navigationExtras: NavigationExtras = {
            state:  { content: this.customer}
          };
          this.router.navigate(['/financial'],navigationExtras);
          this.notificationService.success('Created successfully');
        }else{
          debugger
          this.notificationService.error('Create Failed Something Wrong');    
        } 
      }, error => {
        // Handle update error
        console.error('Create Failed:', error);
        this.notificationService.error('Create Failed ' + error);
      });
      }
      
    }else{
      this.notificationService.error('No Customer Selected');
    }  
  }

}

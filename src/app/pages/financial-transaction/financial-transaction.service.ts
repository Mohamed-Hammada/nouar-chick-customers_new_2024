import { Product } from '../products/product.service';
import { Customer } from '../customers/customers.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Environment } from '../../../environments/environment';
import { NotificationService } from '../../../app/components/notification.service'; // Adjust the import path

export type FinancialTransaction = {
  id?: number;
  statement?: string;
  product?: Product; // Assuming you have a Product type
  count?: number;
  price?: number;
  borrower?: number;
  stock?: number;
  total_borrower?: number;
  total_stock?: number;
  customer?: Customer; // Assuming you have a Customer type
  creation_date?: string; // Assuming you want to use a string representation for Instant
  modification_date?: string; // Assuming you want to use a string representation for Instant
}


export interface FinancialTransactionPage {
  content?: FinancialTransaction[];
  total_elements?: number;
  total_pages?: number;
  pageable?: {
    page_number?: number;
    page_size?: number;
    sort?: {
      empty?: boolean;
      sorted?: boolean;
      unsorted?: boolean;
    };
    offset?: number;
    paged?: boolean;
    unpaged?: boolean;
  };
  last?: boolean;
  number_of_elements?: number;
  size?: number;
  number?: number;
  sort?: {
    empty?: boolean;
    sorted?: boolean;
    unsorted?: boolean;
  };
  empty?: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class FinancialTransactionService {


  apiUrl: string = `${Environment.apiUrl}/api/transactions`;

  constructor(private http: HttpClient,private notificationService: NotificationService) { }


  searchFinancialTransactions(term = '', page = 1, size = 10): Observable<FinancialTransactionPage> {
    return this.http.get<FinancialTransactionPage>(`${this.apiUrl}/search`, {
      params: { term, page: page.toString(), size: size.toString() }
    }).pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }

  getFinancialTransactions(page = 1, size = 10): Observable<FinancialTransactionPage> {
    return this.http.get<FinancialTransactionPage>(`${this.apiUrl}`, {
      params: { page: page.toString(), size: size.toString() }
    });
  }

  getFinancialTransaction(id: number): Observable<FinancialTransaction> {
    return this.http.get<FinancialTransaction>(`${this.apiUrl}/${id}`);
  }

  createFinancialTransaction(financialTransaction: FinancialTransaction): Observable<FinancialTransaction> {
    return this.http.post<FinancialTransaction>(`${this.apiUrl}`, financialTransaction);
  }

  updateFinancialTransaction(financialTransaction: FinancialTransaction): Observable<FinancialTransaction> {
    return this.http.put<FinancialTransaction>(`${this.apiUrl}/${financialTransaction.id}`, financialTransaction);
  }

  deleteFinancialTransaction(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    // Log the error for debugging purposes
    console.error('An error occurred:', error);

    // Notify the user with a snackbar message
    this.notificationService.warn('Something went wrong. Please try again later.');

    // You can return a custom error message or throw the original error
    return throwError('Something went wrong. Please try again later.');
  }
}

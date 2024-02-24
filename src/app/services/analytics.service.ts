import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Environment } from '../../environments/environment';
import { NotificationService } from '../components/notification.service'; // Adjust the import path

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  apiUrl: string = `${Environment.apiUrl}/api/analytics`;

  constructor(private http: HttpClient, private notificationService: NotificationService) { }

  getTotalCustomerCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/customer/count`).pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }

  getTotalFinancialTransactionCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/transaction/count`).pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }

  getTotalProductCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/product/count`).pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }

  getTotalStatementHistoryCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/statement/count`).pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }

  getFinancialTransactionCountPerCustomer(): Observable<Object[]> {
    return this.http.get<Object[]>(`${this.apiUrl}/transaction/customer`).pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }

  getFinancialTransactionCountPerProduct(): Observable<Object[]> {
    return this.http.get<Object[]>(`${this.apiUrl}/transaction/product`).pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }

  getFinancialTransactionCountPerStatementHistory(): Observable<Object[]> {
    return this.http.get<Object[]>(`${this.apiUrl}/transaction/statement`).pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
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

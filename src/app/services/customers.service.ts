import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Environment } from '../../environments/environment';
import { NotificationService } from '../components/notification.service'; // Adjust the import path
import { Customer, CustomerPage } from '../models/customer.model';


@Injectable({
  providedIn: 'root'
})
export class CustomersService {


  apiUrl: string = `${Environment.apiUrl}/api/customers`;

  constructor(private http: HttpClient,private notificationService: NotificationService) { }


  searchCustomers(term = '', page = 0, size = 10): Observable<CustomerPage> {
    return this.http.get<CustomerPage>(`${this.apiUrl}/search`, {
      params: { term, page: page.toString(), size: size.toString() }
    }).pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }

  getCustomers(page = 0, size = 10): Observable<CustomerPage> {
    return this.http.get<CustomerPage>(`${this.apiUrl}`, {
      params: { page: page.toString(), size: size.toString() }
    });
  }

  getCustomer(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiUrl}/${id}`);
  }

  createCustomer(product: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.apiUrl}`, product);
  }

  updateCustomer(product: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.apiUrl}/${product.id}`, product);
  }

  deleteCustomer(id: number): Observable<void> {
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

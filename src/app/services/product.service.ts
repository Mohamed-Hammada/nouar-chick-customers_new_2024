import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Environment } from '../../environments/environment';
import { NotificationService } from '../components/notification.service'; // Adjust the import path
import { Product, ProductPage } from '../models/product.model';



@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  apiUrl: string = `${Environment.apiUrl}/api/products`;

  constructor(private http: HttpClient,private notificationService: NotificationService) { }


  searchProducts(term = '', page = 0, size = 10): Observable<ProductPage> {
    return this.http.get<ProductPage>(`${this.apiUrl}/search`, {
      params: { term, page: page.toString(), size: size.toString() }
    }).pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }

  getProducts(page = 0, size = 10): Observable<ProductPage> {
    return this.http.get<ProductPage>(`${this.apiUrl}`, {
      params: { page: page.toString(), size: size.toString() }
    });
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}`, product);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${product.id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
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

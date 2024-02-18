import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Environment } from '../../../environments/environment';
import { NotificationService } from '../../../app/components/notification.service'; // Adjust the import path

export type StatementHistory = {
  id?: any;
  name?: string;
  description?: string;
  creation_date?: string;
  modification_date?: string;
}

export interface StatementHistoryPage {
  content?: StatementHistory[];
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
export class StatementHistoryService {

  apiUrl: string = `${Environment.apiUrl}/api/statements`;

  constructor(private http: HttpClient,private notificationService: NotificationService) { }


  searchStatementHistorys(term = '', page = 0, size = 10): Observable<StatementHistoryPage> {
    return this.http.get<StatementHistoryPage>(`${this.apiUrl}/search`, {
      params: { term, page: page.toString(), size: size.toString() }
    }).pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }

  getStatementHistorys(page = 0, size = 10): Observable<StatementHistoryPage> {
    return this.http.get<StatementHistoryPage>(`${this.apiUrl}`, {
      params: { page: page.toString(), size: size.toString() }
    });
  }

  getStatementHistory(id: number): Observable<StatementHistory> {
    return this.http.get<StatementHistory>(`${this.apiUrl}/${id}`);
  }

  createStatementHistory(product: StatementHistory): Observable<StatementHistory> {
    return this.http.post<StatementHistory>(`${this.apiUrl}`, product);
  }

  updateStatementHistory(product: StatementHistory): Observable<StatementHistory> {
    return this.http.put<StatementHistory>(`${this.apiUrl}/${product.id}`, product);
  }

  deleteStatementHistory(id: number): Observable<void> {
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

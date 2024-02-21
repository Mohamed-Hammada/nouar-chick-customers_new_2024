import { Product } from '../products/product.service';
import { Customer } from '../customers/customers.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Environment } from '../../../environments/environment';
import { NotificationService } from '../../../app/components/notification.service'; // Adjust the import path
import { StatementHistory } from '../statement-history/statement-history.service';


export type FinancialTransaction = {
  id?: number;
  statement?: StatementHistory;
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

export interface FinancialTransactionResponse {
  financial_transactions?: FinancialTransaction[];
  total_borrower_on_period?: number;
  total_stock_on_period?: number;
  total_stock_on_final?: number;
  total_stock_on_final_real?: number;
  footer_value?: string;
}

export type Response = {
  content: string;
}

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

@Injectable({
  providedIn: 'root'
})
export class FinancialTransactionService {


  apiUrl: string = `${Environment.apiUrl}/api/transactions`;

  constructor(private http: HttpClient, private notificationService: NotificationService) { }


  getFinancialTransactions(customer_id?: number, from?: Date, to?: Date): Observable<FinancialTransactionResponse> {
    const params: any = { customer_id: customer_id, from: from?.toISOString(), to: to?.toISOString() , x:`#${new Date().getTime()}` };
    // debugger
    return this.http.get<FinancialTransactionResponse>(`${this.apiUrl}`, { params });
  }


  getFinancialTransaction(id: number): Observable<FinancialTransaction> {
    return this.http.get<FinancialTransaction>(`${this.apiUrl}/${id}`);
  }

  createFinancialTransaction(customer_id: number, financialTransactions: FinancialTransactionDto[]): Observable<Response> {

    return this.http.post<Response>(`${this.apiUrl}/${customer_id}`, financialTransactions);
  }

  updateFinancialTransaction(customer_id: number, financialTransaction: FinancialTransactionDto): Observable<Response> {
    return this.http.put<Response>(`${this.apiUrl}/${customer_id}`, financialTransaction);
  }

  deleteFinancialTransaction(id: number): Observable<Response> {
    return this.http.delete<Response>(`${this.apiUrl}/${id}`);
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    // Log the error for debugging purposes
    console.error('An error occurred:', error);

    // Notify the user with a snackbar message
    this.notificationService.warn('Something went wrong. Please try again later.');

    // You can return a custom error message or throw the original error
    return throwError('Something went wrong. Please try again later.');
  }

  downloadAllData(): Observable<HttpResponse<Blob>> {
    const url = `${this.apiUrl}/download/#${new Date().getTime()}`;

    return this.http.get(url, {
      observe: 'response',
      responseType: 'blob' as 'json', // This is important for downloading binary data (e.g., a ZIP file)
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control':  'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
        'Pragma': 'no-cache',
        'Expires': '0',
        'Accept': 'application/octet-stream;charset=utf-8',
      })
    }) as Observable<HttpResponse<Blob>>;
  }

  downloadStream(): Observable<Blob> {
    const url = `${this.apiUrl}/download/stream?${new Date().getTime()}`;

    return this.http.get(url, {
      responseType: 'blob' as 'json', // This is important for downloading binary data (e.g., a ZIP file)
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control':  'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
        'Pragma': 'no-cache',
        'Expires': '0',
        'Accept': 'application/octet-stream;charset=utf-8',
      })
    }) as Observable<Blob>;
  }

  downloadBatch2(): Observable<Blob> {
    const url = `${this.apiUrl}/download/batch?${new Date().getTime()}`;

    return this.http.get(url, {
      responseType: 'blob' as 'json', // This is important for downloading binary data (e.g., a ZIP file)
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control':  'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
        'Pragma': 'no-cache',
        'Expires': '0',
        'Accept': 'application/octet-stream;charset=utf-8',
      })
    }) as Observable<Blob>;
  }

  downloadBatch() {

    const url = `${this.apiUrl}/download/batch`;

    this.http.get(url, { responseType: 'blob',      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/octet-stream;charset=utf-8',
    }) }).subscribe((response: Blob) => {
      // debugger
      response.text().then((text) => {
        console.log(text)
      })
      const blob = new Blob([response], { type: 'application/octet-stream;charset=utf-8' });

      // Create a URL for the blob
      const downloadURL = window.URL.createObjectURL(blob);

      // Create a link element
      const link = document.createElement('a');
      link.href = downloadURL;

      // Set the filename
      link.download = 'customers_financial_history.csv'; // Change 'filename.extension' to the desired filename

      // Append the link to the body
      document.body.appendChild(link);

      // Trigger the download
      link.click();

      // Cleanup
      window.URL.revokeObjectURL(downloadURL);
      document.body.removeChild(link);
    });


  }

  public blobToFile = (theBlob: Blob, fileName:string): File => {
    const b: any = theBlob;
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    b.lastModifiedDate = new Date();
    b.name = fileName;
      
    //Cast to a File() type
    return theBlob as File;
  }
  

}

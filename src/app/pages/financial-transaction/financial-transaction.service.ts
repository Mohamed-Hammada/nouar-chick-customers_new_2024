import { Injectable } from '@angular/core';
import { Product } from '../products/product.service';
import { Customer } from '../customers/customers.service';

export type FinancialTransaction = {
  id?: number;
  statement?: string;
  product?: Product; // Assuming you have a Product type
  count?: number;
  price?: number;
  borrower?: number;
  stock?: number;
  totalBorrower?: number;
  totalStock?: number;
  customer?: Customer; // Assuming you have a Customer type
  creationDate?: string; // Assuming you want to use a string representation for Instant
  modificationDate?: string; // Assuming you want to use a string representation for Instant
}

@Injectable({
  providedIn: 'root'
})
export class FinancialTransactionService {

  constructor() { }
}

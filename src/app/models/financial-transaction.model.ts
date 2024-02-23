import { Customer } from "./customer.model";
import { Product } from "./product.model";
import { StatementHistory } from "./statement-history.model";

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
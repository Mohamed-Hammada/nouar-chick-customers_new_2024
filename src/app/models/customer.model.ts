import { FinancialTransaction } from "./financial-transaction.model";

export type Customer = {
    id?: number;
    code_id?: number;
    name?: string;
    contact_details?: string;
    creation_date?: string; // Assuming you want to use a string representation for Instant
    modification_date?: string; // Assuming you want to use a string representation for Instant
    visible_to_normal_users?: boolean;
    transactions?: FinancialTransaction[]; // Assuming you have a FinancialTransaction type
  }

  export interface CustomerPage {
    content?: Customer[];
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
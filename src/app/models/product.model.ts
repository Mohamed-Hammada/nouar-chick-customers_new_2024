export type Product = {
    id?: any;
    name?: string;
    description?: string;
    creation_date?: string;
    modification_date?: string;
  }

  
  
  export interface ProductPage {
    content?: Product[];
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

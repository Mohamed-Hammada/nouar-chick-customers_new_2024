import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, OnInit, ViewChild, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { NavigationExtras, Router } from '@angular/router';
import { TranslationService } from '../../_helper/translation.service';
import { CustomeSearchComponent } from "../../components/custome-search/custome-search.component";

import { ProductService } from '../../services/product.service';
import { ConfirmationDialogService } from '../../components/confirmation-dialog/confirmation-dialog.service';
import { NotificationService } from '../../components/notification.service';
import { KeycloakService } from 'keycloak-angular';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { Direction } from '@angular/cdk/bidi';
import { ProductPage } from '../../models/product.model';


@Component({
  selector: 'app-products',
  standalone: true,
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  imports: [CommonModule, MatIconModule, TranslateModule,MatPaginatorModule, MatCardModule, MatToolbarModule, MatButtonModule, CustomeSearchComponent]
})
export class ProductsComponent implements OnInit {
  cards$!: Observable<ProductPage>;
  currentPage: number = 0;
  totalPages: number = -1;
  pageSize: number = 5;

  pageSizeOptions: number[] = [5, 10, 15, 20, 50, 100, 200, 500];
  totalRecords: number = -1;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  direction: Direction = 'rtl';
  constructor(private service: ProductService,
    private confirmationDialogService: ConfirmationDialogService,
    private keycloakService: KeycloakService,

    private notificationService: NotificationService,
    private router: Router,
    private translationService: TranslationService,
    private changeDetectorRef: ChangeDetectorRef) {
      this.direction = this.translationService.currentLangDirection();
  }
  ngOnInit(): void {
    const isLoggedIn = this.keycloakService.isLoggedIn();
    if (!isLoggedIn)
      this.keycloakService.login();

    if (isLoggedIn) {
      this.cards$ = this.service.getProducts()
      this.loadData();
    }
  }
  loadData(searchTerm: string | null = ''): void {
    // if(searchTerm){
    this.cards$ = this.service.searchProducts(searchTerm ? searchTerm : '', 0, this.pageSize);
    // }else{
    // this.cards$ = this.service.getProducts(this.currentPage, this.pageSize);
    // }
    this.cards$.subscribe((data: ProductPage) => {
      this.handleDataResponse(data);
    });
  }

  handleDataResponse(data: ProductPage) {

    if (!data) { return; }
    if (!data.content) { return; }

    this.totalRecords = data.total_elements || -1;
    this.totalPages = data.total_pages || -1;
    this.currentPage = data.pageable?.page_number || 0;
    this.pageSize = data.pageable?.page_size || 5;

    if (this.paginator) {
      this.paginator.pageIndex = this.currentPage - 1;
      this.paginator.pageSize = this.pageSize;
      this.paginator.length = this.totalRecords;
      this.changeDetectorRef.detectChanges(); // Trigger change detection
    }
  }
  onPageEvent(event: any) {
    // Here you will call your service function to get the data for the current page
    // This would be replaced with an API call in a real scenario
    // this.childRecords = this.dummyDataService.getChildrenByPage(event.pageIndex, event.pageSize);
    this.loadData();
  }

  prevPage(): void {

    this.currentPage--;
    this.loadData();

  }

  nextPage(): void {
    this.currentPage++;
    this.loadData();
  }

  pageEvent(event: any): void {
    // debugger
    // Page size changed
    if (event.pageSize !== this.pageSize) {
      this.pageSizeChanged(event);
    }
    // Next page
    else if (event.pageIndex > event.previousPageIndex) {
      this.nextPage();
    }
    // Previous page
    else if (event.pageIndex < event.previousPageIndex) {
      this.prevPage();
    }
  }

  pageSizeChanged(event: any): void {
    this.pageSize = event.pageSize;
    this.currentPage = 0;  // Reset to the first page when changing page size
    this.loadData();
  }
  // In your component class
  myTrackByFunc(index: number, card: any): number {
    return card.id; // Assuming 'id' is a unique identifier for each card
  }

  addChildHandler(card?: any, readOnly: boolean = false): void {
    let navigationExtras: NavigationExtras;
    if (card) {
      navigationExtras = {
        state: { readOnly: readOnly, content: card }
      };
    } else {
      navigationExtras = {
        state: {}
      };
    }

    this.router.navigate(['/create-update-product'], navigationExtras);
  }

  handleSearchTermChange(searchTerm: string): void {
    console.log('Search term changed:', searchTerm);
    this.loadData(searchTerm);
    // Do something with the search term, e.g., trigger a search
  }


  delete(card: any): void {
    this.service.deleteProduct(card.id).subscribe(response => {
      this.loadData();
      // Handle update success
      this.notificationService.success('Customer Deleted successfully');
    }, error => {
      // Handle update error
      console.error('Delete failed:', error);
      this.notificationService.error('Delete failed');
    });
  }

  handleDelete(card: any): void {
    this.confirmationDialogService
      .openConfirmationDialog(this.translationService.instant('delete_product_confirmation'))
      .subscribe((result) => {
        if (result) {
          // User confirmed deletion, proceed with delete
          this.delete(card);
        }
      });

  }
}

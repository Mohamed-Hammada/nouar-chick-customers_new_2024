import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, OnInit, ViewChild, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { LanguageService } from '../../_helper/language.service';
import { DataService } from '../../_helper/data.service';
import { CustomeSearchComponent } from "../../components/custome-search/custome-search.component";
import { FinancialTransactionPage, FinancialTransactionService } from './financial-transaction.service';

@Component({
  selector: 'app-financial-transaction',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatPaginatorModule, MatCardModule, MatToolbarModule, MatButtonModule, CustomeSearchComponent]
  ,
  templateUrl: './financial-transaction.component.html',
  styleUrl: './financial-transaction.component.scss'
})
export class FinancialTransactionComponent implements OnInit{
  cards$: Observable<FinancialTransactionPage>;
  currentPage: number = 0;
  totalPages: number = -1;
  pageSize: number = 5;
 
  pageSizeOptions: number[] = [5, 10, 15, 20, 50, 100, 200, 500];
  totalRecords: number = -1;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  constructor(private service: FinancialTransactionService,
    private router: Router,
    private languageService: LanguageService,
    private changeDetectorRef: ChangeDetectorRef,
    private dataService: DataService) {
    this.languageService.setDefaultLanguage();
    this.cards$ = this.service.getFinancialTransactions()
  }
  ngOnInit(): void {
    this.loadData();

  }
  loadData(searchTerm :string|null = ''): void {
    if(searchTerm){
      this.cards$ = this.service.searchFinancialTransactions( searchTerm ,0, this.pageSize);
    }else{
    this.cards$ = this.service.getFinancialTransactions(this.currentPage, this.pageSize);
    }
    this.cards$.subscribe((data: FinancialTransactionPage) => {
      this.handleDataResponse(data);
    });
  }

  handleDataResponse(data: FinancialTransactionPage) {
  
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

  addChildHandler(card?:any , readOnly:boolean = false): void {
    if(card){
      this.dataService.setData({ readOnly:readOnly , content: card });
    }else{
      this.dataService.setData({ });
    }
    
    this.router.navigate(['/create-update-financial']);
  }

  handleSearchTermChange(searchTerm: string): void {
    console.log('Search term changed:', searchTerm);
    this.loadData(searchTerm);
    // Do something with the search term, e.g., trigger a search
  }
}

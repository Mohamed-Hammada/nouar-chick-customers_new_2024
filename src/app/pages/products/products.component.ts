import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { ProductPage, ProductService } from './product.service';
import { Observable } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { LanguageService } from '../../_helper/language.service';
import { Router } from '@angular/router';
import { DataService } from '../../_helper/data.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatCardModule, MatToolbarModule, MatButtonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  cards$: Observable<ProductPage>;

  constructor(private service: ProductService,
    private router: Router,
    private languageService: LanguageService,
    private dataService: DataService) {
    this.languageService.setDefaultLanguage();
    this.cards$ = this.service.getProducts()
  }

  // In your component class
  myTrackByFunc(index: number, card: any): number {
    return card.id; // Assuming 'id' is a unique identifier for each card
  }

  addChildHandler(card?:any) {
    if(card){
      this.dataService.setData(card);
    }else{
      this.dataService.setData({ });
    }
    
    this.router.navigate(['/create-update-product']);
  }
}

import { CommonModule } from '@angular/common';
import { Component, Signal, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Product, ProductPage, ProductService } from './product.service';
import { Observable } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule,MatIconModule, MatCardModule, MatToolbarModule, TranslateModule, MatButtonModule,HttpClientModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  cards$ : Observable< ProductPage>;

  constructor(private service : ProductService  , private translateService: TranslateService) {
    const userLang =  'ar'
    const languageCode = userLang.split('-')[0]
    this.translateService.setDefaultLang(languageCode);
    this.translateService.use(languageCode);
    this.cards$ =  this.service.getProducts()
  }
}

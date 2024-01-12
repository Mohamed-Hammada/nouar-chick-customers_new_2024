import { Routes } from '@angular/router';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FinancialTransactionComponent } from './pages/financial-transaction/financial-transaction.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { ProductsComponent } from './pages/products/products.component';
import { CreateUpdateProductComponent } from './pages/products/create-update-product/create-update-product.component';


 

export const routes: Routes = [
  // { path: '' ,component: DashboardComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'analytics', component: AnalyticsComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'financial', component: FinancialTransactionComponent },
  { path: 'customers', component: CustomersComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'create-update-product', component: CreateUpdateProductComponent },
];


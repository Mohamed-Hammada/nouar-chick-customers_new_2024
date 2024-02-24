import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FinancialTransactionComponent } from './pages/financial-transaction/financial-transaction.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { ProductsComponent } from './pages/products/products.component';
import { CreateUpdateProductComponent } from './pages/products/create-update-product/create-update-product.component';
import { CreateUpdateCustomersComponent } from './pages/customers/create-update-customers/create-update-customers.component';
import { StatementHistoryComponent } from './pages/statement-history/statement-history.component';
import { CreateUpdateStatementHistoryComponent } from './pages/statement-history/create-update-statement-history/create-update-statement-history.component';
import { CreateUpdateFinancialTransactionComponent } from './pages/financial-transaction/create-update-financial-transaction/create-update-financial-transaction.component';
import { LogoutComponent } from './components/logout/logout.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';


 

export const routes: Routes = [
  // { path: '' ,component: DashboardComponent },
  { path: '', redirectTo: 'customers', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, data: { title: 'dashboard_title' } },
  { path: 'financial', component: FinancialTransactionComponent, data: { title: 'financial_title' } },
  { path: 'statement-history', component: StatementHistoryComponent, data: { title: 'statement-history_title' } },
  { path: 'customers', component: CustomersComponent, data: { title: 'customers_title' } },
  { path: 'products', component: ProductsComponent, data: { title: 'products_title' } },
  { path: 'create-update-product', component: CreateUpdateProductComponent, data: { title: 'create-update-product_title' } },
  { path: 'create-update-customer', component: CreateUpdateCustomersComponent, data: { title: 'create-update-customer_title' } },
  { path: 'create-update-statement-history', component: CreateUpdateStatementHistoryComponent, data: { title: 'create-update-statement-history_title' } },
  { path: 'create-update-financial', component: CreateUpdateFinancialTransactionComponent, data: { title: 'create-update-financial_title' } },
  { path: 'analytics', component: AnalyticsComponent , data: { title: 'analytics_title' }},
  { path: 'logout', component: LogoutComponent },
];


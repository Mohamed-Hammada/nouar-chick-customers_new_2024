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
  { path: 'dashboard', component: DashboardComponent },
  { path: 'financial', component: FinancialTransactionComponent },
  { path: 'statement-history', component: StatementHistoryComponent},
  { path: 'customers', component: CustomersComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'create-update-product', component: CreateUpdateProductComponent },
  { path: 'create-update-customer', component: CreateUpdateCustomersComponent },
  { path: 'create-update-statement-history', component: CreateUpdateStatementHistoryComponent },
  { path: 'create-update-financial', component: CreateUpdateFinancialTransactionComponent },
  { path: 'analytics', component: AnalyticsComponent },
  { path: 'logout', component: LogoutComponent },
];


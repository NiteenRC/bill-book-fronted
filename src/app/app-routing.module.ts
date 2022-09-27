import { SalesTableComponent } from './ui_modules/table/sales-table.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { RegisterComponent } from './setting/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { AuthGuard } from './auth.guard';
import { CustomersListComponent } from './data/customers/customers-list/customers-list.component';
import { CompanyListComponent } from './data/companies/company-list/company-list.component';
import { CategoryListComponent } from './data/categories/category-list/category-list.component';
import { LocationListComponent } from './data/locations/location-list/location-list.component';
import { CreateLocationComponent } from './data/locations/create-location/create-location.component';
import { CreateCategoryComponent } from './data/categories/create-category/create-category.component';
import { CreateCustomerComponent } from './data/customers/create-customer/create-customer.component';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './data/products/product-list/product-list.component';
import { ProfitSummaryComponent } from './reports/profit-summary/profit-summary.component';
import { UpdateBankInfoComponent } from './setting/update-bank-info/update-bank-info.component';
import { LoginComponent } from './setting/login/login.component';
import { BalanceSheetComponent } from './sales/customer-balance-sheet/list-customer-balance-sheet/balance-sheet.component';
import { SalesOrderComponent } from './sales/salesoder/sales-order.component';
import { SalesReportComponent } from './sales/sales-report/sales-report.component';
import { ProductSummaryComponent } from './reports/product-summary/product-summary.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, },
  { path: 'register', component: RegisterComponent },
  { path: '404', component: NotfoundComponent },

  {
    path: 'dashboard', pathMatch: 'prefix', canActivate: [AuthGuard],
    component: DashboardComponent,
    children: [
      { path: 'products', component: ProductListComponent, canActivate: [AuthGuard] },
      { path: 'category', component: CreateCategoryComponent },
      { path: 'salesOrder', component: SalesOrderComponent },
      { path: 'location', component: CreateLocationComponent },
      { path: 'customer', component: CreateCustomerComponent },
      { path: 'balance-sheet', component: BalanceSheetComponent },
      { path: 'customers-list', component: CustomersListComponent },
      { path: 'companies-list', component: CompanyListComponent },
      { path: 'categories-list', component: CategoryListComponent },
      { path: 'locations-list', component: LocationListComponent },
      { path: 'home', component: HomeComponent },
      { path: 'profit-summary', component: ProfitSummaryComponent },
      { path: 'sales-report', component: SalesReportComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'product-summary', component: ProductSummaryComponent },
      { path: 'updateBankDetails', component: UpdateBankInfoComponent }
    ]
  },
  { path: 'salesTable', component: SalesTableComponent },
  { path: '**', redirectTo: '404', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule { }

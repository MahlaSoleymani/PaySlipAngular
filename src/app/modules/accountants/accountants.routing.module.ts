import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountantsDashboardComponent } from './pages/accountants-dashboard/accountants-dashboard.component';
import { ConfigComponent } from './pages/config/config.component';
import { ReceiptComponent } from './pages/receipt/receipt.component';
import { AccountantsLayoutComponent } from './pages/accountants-layout/accountants-layout.component';
import { ViewPdfComponent } from 'src/app/shared/components/view-pdf/view-pdf.component';

const routes: Routes = [
  {
    path: '',
    component: AccountantsLayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: AccountantsDashboardComponent,
      },
      {
        path: 'settings',
        component: ConfigComponent,
      },
      {
        path: 'receipt',
        component: ReceiptComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule
    .forChild(routes)
  ],
  exports: [RouterModule],
})
export class AccountantsRoutingModule {}

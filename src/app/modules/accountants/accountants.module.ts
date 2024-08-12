import { NgModule } from '@angular/core';
import { AccountantsDashboardComponent } from './pages/accountants-dashboard/accountants-dashboard.component';
import { AccountantsRoutingModule } from './accountants.routing.module';
import { ConfigComponent } from './pages/config/config.component';
import { ReceiptComponent } from './pages/receipt/receipt.component';
import { AccountantsLayoutComponent } from './pages/accountants-layout/accountants-layout.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserModule } from '../user/user.module';
import { MaterialDesignModule } from 'src/app/shared/material-design.module';
import { AddReceiptComponent } from './pages/add-receipt/add-receipt.component';
import { EditReceiptComponent } from './pages/edit-receipt/edit-receipt.component';
import { EditConfigComponent } from './pages/edit-config/edit-config.component';
import { AddConfigComponent } from './pages/add-config/add-config.component';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { ViewPdfComponent } from 'src/app/shared/components/view-pdf/view-pdf.component';

@NgModule({
  declarations: [
    AccountantsDashboardComponent,
    ConfigComponent,
    ReceiptComponent,
    AccountantsLayoutComponent,
    AddReceiptComponent,
    EditReceiptComponent,
    EditConfigComponent,
    AddConfigComponent,
    ViewPdfComponent,

  ],
  imports: [
    AccountantsRoutingModule,
    SharedModule,
    MaterialDesignModule,
    MatSelectModule,
    CommonModule,
  ],
  exports: [SharedModule, MaterialDesignModule],
  providers: [],
})
export class AccountantsModule {}

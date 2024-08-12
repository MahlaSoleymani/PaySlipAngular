import { NgModule } from '@angular/core';
import { CompanyDashboardComponent } from './pages/company-dashboard/company-dashboard.component';
import { CompanyRoutingModule } from './company.routing.module';
import { EmploymentComponent } from './pages/employment/employment.component';
import { CompanyLayoutComponent } from './pages/company-layout/company-layout.component';
import { MaterialDesignModule } from 'src/app/shared/material-design.module';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddEmploymentComponent } from './pages/add-employment/add-employment.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserModule } from '../user/user.module';
import { EditEmploymentComponent } from './pages/edit-employment/edit-employment.component';
import { TimeOffComanyComponent } from './pages/time-off-comany/time-off-comany.component';
import { DetailsEmploymentComponent } from './pages/details-employment/details-employment.component';
import { RejectTimeOffComponent } from './pages/reject-time-off/reject-time-off.component';
import { CompanyOptionComponent } from './pages/company-option/company-option.component';

@NgModule({
  declarations: [
    CompanyDashboardComponent,
    EmploymentComponent,
    CompanyLayoutComponent,
    AddEmploymentComponent,
    EditEmploymentComponent,
    TimeOffComanyComponent,
    DetailsEmploymentComponent,
    RejectTimeOffComponent,
    CompanyOptionComponent,

  ],
  imports: [
    CompanyRoutingModule,
    MaterialDesignModule,
    ReactiveFormsModule,
    NgxMaterialTimepickerModule,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    SharedModule,
    UserModule
  ],
  exports: [MaterialDesignModule,
   ],
  providers: [],
})
export class CompanyModule {}

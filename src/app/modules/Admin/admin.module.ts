import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialDesignModule } from 'src/app/shared/material-design.module';
import { AdminLayoutComponent } from './pages/admin-layout/admin-layout.component';
import { RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { AdminRoutingModule } from './admin.routing.module';
import { CompanyComponent } from './pages/company/company.component';
import { AddCompanyComponent } from './pages/add-company/add-company.component';


@NgModule({
    declarations: [AdminLayoutComponent, AdminDashboardComponent, CompanyComponent, AddCompanyComponent],
    imports: [AdminRoutingModule, SharedModule, RouterModule,],
    exports: [SharedModule, MaterialDesignModule, AdminLayoutComponent, AdminDashboardComponent],
    providers: [],
})
export class AdminModule { }

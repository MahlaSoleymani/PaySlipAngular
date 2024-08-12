import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyLayoutComponent } from './pages/company-layout/company-layout.component';
import { CompanyDashboardComponent } from './pages/company-dashboard/company-dashboard.component';
import { EmploymentComponent } from './pages/employment/employment.component';
import { TimeOffComanyComponent } from './pages/time-off-comany/time-off-comany.component';
import { CompanyOptionComponent } from './pages/company-option/company-option.component';


const routes: Routes = [
  {
    path: '',
    component: CompanyLayoutComponent,
    children:[
      {
        path:'dashboard' , component: CompanyDashboardComponent
      },
      {
        path:'employment' , component: EmploymentComponent
      },
      {
        path:'time-off' , component: TimeOffComanyComponent
      },
      {
        path:'settings' , component: CompanyOptionComponent
      }
           
    ]
  },
];

@NgModule({
  imports: [RouterModule
    .forChild(routes)
  ],
  exports: [RouterModule],
})
export class CompanyRoutingModule {}

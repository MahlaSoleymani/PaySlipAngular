import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTimeOffComponent } from './pages/add-time-off/add-time-off.component';
import { TimeOffDashboardComponent } from './pages/time-off-dashboard/time-off-dashboard.component';
import { UserDashbordComponent } from './pages/user-dashbord/user-dashbord.component';
import { UserLayoutComponent } from './pages/user-layout/user-layout.component';


const routes: Routes = [
  {
    path: '',
    component: UserLayoutComponent,
    children:[
      {
        path:'dashboard' , component: UserDashbordComponent
      },
      {
        path:'time-off' , component: TimeOffDashboardComponent
      },
      {
        path:'add-time-off' , component: AddTimeOffComponent
      },
      
    ]
  },
];

@NgModule({
  imports: [RouterModule
    .forChild(routes)
  ],
  exports: [RouterModule],
})
export class UserRoutingModule {}

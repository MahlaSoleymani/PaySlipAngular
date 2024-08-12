import { NgModule } from '@angular/core';
import { UserDashbordComponent } from './pages/user-dashbord/user-dashbord.component';
import { UserRoutingModule } from './user.routing.module';
import { TimeOffDashboardComponent } from './pages/time-off-dashboard/time-off-dashboard.component';
import { MaterialDesignModule } from 'src/app/shared/material-design.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CalendarComponent } from 'src/app/shared/components/calendar/calendar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { RouterModule } from '@angular/router';
import { UserLayoutComponent } from './pages/user-layout/user-layout.component';
import { AddTimeOffComponent } from './pages/add-time-off/add-time-off.component';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { CommonModule } from '@angular/common';
import { TimeType } from 'src/app/shared/pipes/time-type.pipe';
import { TimeOffType } from 'src/app/shared/pipes/time-off-type-pipe';
import { TimeOffStatus } from 'src/app/shared/pipes/time-off-status.pipe';
import { EditTimeOffComponent } from './pages/edit-time-off/edit-time-off.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DetailsTimeOffComponent } from './pages/details-time-off/details-time-off.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';




@NgModule({
  declarations: [
    UserDashbordComponent,
    TimeOffDashboardComponent,
    CalendarComponent,
    UserLayoutComponent,
    AddTimeOffComponent,
    TimeType,
    TimeOffType,
    TimeOffStatus,
    EditTimeOffComponent,
    DetailsTimeOffComponent,
  ],
  imports: [
    ReactiveFormsModule ,
    NgxMaterialTimepickerModule,
    UserRoutingModule,
    FormsModule,
    MatDatepickerModule,
    MaterialDesignModule,
    RouterModule,
    CommonModule,
    SharedModule,
    // BrowserAnimationsModule
    // NoopAnimationsModule
  ],
  exports: [
    MaterialDesignModule,
    FlexLayoutModule,
    TimeType,
    TimeOffType,
    TimeOffStatus,
  ],
  providers: [],
})
export class UserModule {}

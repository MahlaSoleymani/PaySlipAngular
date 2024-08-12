import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { MaterialDesignModule } from './material-design.module';
import { MatSortModule } from '@angular/material/sort';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoginComponent } from './pages/login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DateTimeInputComponent } from './components/date-time-input/date-time-input.component';
import { NgxMaskModule } from 'ngx-mask';
import { AlertMsgComponent } from './components/alert-msg/alert-msg.component';
import { ConfirmMsgComponent } from './components/confirm-msg/confirm-msg.component';
import { MonthPipe } from './pipes/month.pipe';
import { ProfileComponent } from './components/profile/profile.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TableComponent } from './components/table/table.component';
import { RegisterComponent } from './pages/register/register.component';
import { MaterialTimePickerModule } from '@candidosales/material-time-picker';
// import {DpDatePickerModule} from 'ng2-jalali-date-picker';
import { NgPersianDatepickerModule } from 'ng-persian-datepicker';

@NgModule({
  declarations: [
    SnackbarComponent,
    LoginComponent,
    AlertMsgComponent,
    ConfirmMsgComponent,
    DateTimeInputComponent,
    MonthPipe,
    ProfileComponent,
    HeaderComponent,
    SidebarComponent,
    TableComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    MaterialDesignModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    MatSortModule,
    FlexLayoutModule,
     NgxMaskModule.forRoot(),
     MaterialTimePickerModule,
    //  DpDatePickerModule
    NgPersianDatepickerModule,
  ],
  exports: [
    MaterialDesignModule,
    SnackbarComponent,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    MatSortModule,
    MaterialTimePickerModule,
    AlertMsgComponent,
    ConfirmMsgComponent,
    DateTimeInputComponent,
    SidebarComponent,
    HeaderComponent,
    TableComponent,
    
  ],
  providers: [  ],
})
export class SharedModule {}

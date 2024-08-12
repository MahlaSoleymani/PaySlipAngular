import { BrowserModule } from '@angular/platform-browser';
import { NgModule, PLATFORM_ID } from '@angular/core';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtInterceptor, JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { jwtOptionsFactory } from './core/authentication/credentials.service';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { HttpErrorHandelerInterceptor } from './core/interceptors/http-error-handeler.interceptor';
import { getPersianPaginatorIntl } from './core/prodivers/persian-mat-paginator-localize';
import { ThemingService } from './core/services/theming.service';
import { RouterModule } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { UserModule } from './modules/user/user.module';
import { AccountantsModule } from './modules/accountants/accountants.module';
import { CompanyModule } from './modules/company/company.module';
import { MatMomentDateModule} from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { DecimalPipe } from '@angular/common';
import { AdminModule } from './modules/Admin/admin.module';



@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    NoopAnimationsModule,
    AppRoutingModule,
    MatMomentDateModule,
    AccountantsModule,
    CompanyModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    SharedModule,
    UserModule,
    RouterModule,
    MatChipsModule,
    BrowserModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatInputModule,
    AdminModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [PLATFORM_ID]
      }
    }),

  ],
  providers: [
    DecimalPipe,
    { provide: MAT_DATE_LOCALE, useValue: 'fa-IR' },
    ThemingService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorHandelerInterceptor, multi: true },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 4000 } },
    { provide: MatPaginatorIntl, useValue: getPersianPaginatorIntl() },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true, disableClose: false } },
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
  ],

  exports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

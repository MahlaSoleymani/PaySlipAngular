import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './shared/pages/login/login.component';
import { MustLogoutGuard } from './core/guards/must-logout.guard';
import { ViewPdfComponent } from './shared/components/view-pdf/view-pdf.component';
import { RegisterComponent } from './shared/pages/register/register.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [MustLogoutGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./modules/user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'accountants',
    loadChildren: () =>
      import('./modules/accountants/accountants.module').then(
        (m) => m.AccountantsModule
      ),
  },
  {
    path: 'company',
    loadChildren: () =>
      import('./modules/company/company.module').then((m) => m.CompanyModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/Admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'ViewPdf',
    component: ViewPdfComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

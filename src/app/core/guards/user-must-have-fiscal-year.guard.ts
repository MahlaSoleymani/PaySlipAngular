import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CredentialsService } from '../authentication/credentials.service';

@Injectable({
  providedIn: 'root'
})
export class UserMustHaveFiscalYearGuard implements CanActivate, CanActivateChild {
  constructor(private credit: CredentialsService, private router: Router, private dialog: MatDialog,) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // if (!this.credit.credentials.FiscalYearId
    //   && (this.credit.credentials.DepartmentType === '4')) {
    //   this.router.navigate(['/set-fiscal-year']);
    //   return false;
    //   // var dialog = this.dialog.open(SetFiscalYearComponent, {
    //   //   width: '60%',
    //   //   disableClose: true,
    //   // });

    //   // dialog.afterClosed().subscribe((res: any) => {
    //   // console.log(res);

    //   // if(res !== undefined && res !== null){
    //   //   if (
    //   //     (this.credit.credentials.FiscalYearId === 'null')
    //   //     && (this.credit.credentials.DepartmentType === '4')) {
    //   //     this.credit.setCredentials();
    //   //     this.router.navigate(['/login']);

    //   //     return false;
    //   //   } else {
    //   //     return true;
    //   //   }
    //   // }

    //   // });
    //   // return false;

    // }
    return true;
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // if (!this.credit.credentials.FiscalYearId
    //   && (this.credit.credentials.DepartmentType === '4')) {
    //   this.router.navigate(['/set-fiscal-year']);
    //   return false;
    //   // var dialog = this.dialog.open(SetFiscalYearComponent, {
    //   //   width: '60%',
    //   //   disableClose: true,
    //   // });

    //   // dialog.afterClosed().subscribe((res: any) => {
    //   // console.log(res);

    //   // if(res !== undefined && res !== null){
    //   //   if (
    //   //     (this.credit.credentials.FiscalYearId === 'null')
    //   //     && (this.credit.credentials.DepartmentType === '4')) {
    //   //     this.credit.setCredentials();
    //   //     this.router.navigate(['/login']);

    //   //     return false;
    //   //   } else {
    //   //     return true;
    //   //   }
    //   // }

    //   // });
    //   // return false;

    // }
    return true;
  }

}

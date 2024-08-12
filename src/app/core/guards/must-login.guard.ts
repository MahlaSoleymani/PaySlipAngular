import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CredentialsService } from '../authentication/credentials.service';


@Injectable({
  providedIn: 'root'
})
export class MustLoginGuard implements CanActivateChild, CanActivate {
  constructor(private credit: CredentialsService, private router: Router, private dialog: MatDialog,) { }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.credit.isAuthenticated()) {
      // this.router.navigate(['/login']);
      this.router.navigate(['']);
      return false;
    }


    return true;
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    if (!this.credit.isAuthenticated()) {
      // this.router.navigate(['/login']);
      this.router.navigate(['']);

      return false;
    }


    return true;

  }
}

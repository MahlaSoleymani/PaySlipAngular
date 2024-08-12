import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CredentialsService } from '../authentication/credentials.service';


@Injectable({
  providedIn: 'root'
})
export class MustLogoutGuard implements CanActivate, CanActivateChild {
  constructor(private credit: CredentialsService, private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const test = this.credit.isAuthenticated();
    if (test) {
      this.router.navigate(['']);
    }
    return !test;

  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const test = this.credit.isAuthenticated();
    if (test) {
      this.router.navigate(['']);
    }
    return !test;
  }

}

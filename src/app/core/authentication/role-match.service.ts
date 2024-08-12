import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SnackbarService } from '../services/snackbar.service';
import { CredentialsService } from './credentials.service';

@Injectable({
  providedIn: 'root'
})
export class RoleMatchService implements CanActivate, CanActivateChild {

  constructor(private credentialService: CredentialsService, private router: Router, private snack: SnackbarService) { }
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const roles = childRoute.data['roles'] as Array<string>;
    if (roles) {
      const match = this.roleMatch(roles);
      if (match) {
        return true;
      }
      else {
        this.router.navigate(['/']);
        this.snack.showError('شما اجازه دسترسی به این صفحه را ندارید');
      }
    }
    return true;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const roles = route.data['roles'] as Array<string>;
    if (roles) {
      const match = this.roleMatch(roles);
      if (match) {
        return true;
      }
      else {
        this.router.navigate(['/']);
        this.snack.showError('شما اجازه دسترسی به این صفحه را ندارید');
      }
    }
    return true;
  }

  roleMatch(allowedRoles): boolean {
    let isMatch = false;
    if (!this.credentialService.credentials.role) {
      return false;
    }
    const userRoles = this.credentialService.credentials.role as Array<string>;
    if (!userRoles) {
      return false;
    }
    allowedRoles.forEach((element: any) => {
      if (userRoles.includes(element)) {
        isMatch = true;
        return;
      }
    });
    return isMatch;
  }

}

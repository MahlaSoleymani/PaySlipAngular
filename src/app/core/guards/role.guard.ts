import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CredentialsService } from '../authentication/credentials.service';
import { SnackbarService } from '../services/snackbar.service';


@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate, CanActivateChild {

  constructor(private credentialService: CredentialsService, private router: Router, private snack: SnackbarService) { }
  canActivateChild(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    var menuAccessRole = this.credentialService.credentials.Menu;
    var dataRoles = next.data.roles as Array<string>;
    let isMatch = false;


    if (dataRoles == undefined) {
      return false;
    }
    //List
    var menuAccessRoleList = menuAccessRole.split('|');
    dataRoles.forEach((dataRole: any) => {
      var y = dataRole.split(',');
      menuAccessRoleList.forEach((r: any) => {
        var role = r.split(',');
        if (role[0] == y[0] && y[1].substring(0, 1) == '1') {
          isMatch = true;
          return;
        }
      });
    });
    return isMatch;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return true;
  }

}

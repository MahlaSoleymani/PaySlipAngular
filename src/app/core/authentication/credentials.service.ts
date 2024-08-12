import { Injectable, Inject } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { isPlatformBrowser } from '@angular/common';

export interface Credentials {
  Type: any;
  Verifyed: string;
  Id: number;
  CompanyId:number;
  UserName: string;
  FullName: string;
  Name: string;
  AvatarPath: string;
  UserType: string;
  Email: string;
  Gender: string;
  BirthDate: Date;
  PhoneNumber: string;
  token: string;
  PaymentType: number;
  role: any;
  Picture: string;
}


const credentialsKey = 'accounting_credentials';

export function jwtOptionsFactory(platformId: any): any {
  const jwtHelper = new JwtHelperService();

  return {
    tokenGetter: () => {
      const savedCredentials = localStorage.getItem(credentialsKey);
      let token = null;
      if (isPlatformBrowser(platformId)) {
        if (
          typeof sessionStorage !== 'undefined' &&
          sessionStorage.length > 0
        ) {
          const savedCredentials =
            sessionStorage.getItem(credentialsKey) ||
            localStorage.getItem(credentialsKey);
          if (savedCredentials) {
            token = JSON.parse(savedCredentials).token;
          }
        }
      }

      return token;
    },
    allowedDomains: [
      'localhost:7158',
      'localhost:5000',
      'localhost:5001',
      'localhost:5002',
      '192.168.10.241:8043',
      'api.sajaab.ir',
      'api.accounting.sk.local',
    ],
  };
}

/**
 * Provides storage for authentication credentials.
 * The Credentials interface should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root',
})
export class CredentialsService {
  // tslint:disable-next-line: variable-name
  private _credentials: Credentials | null = null;

  constructor(public jwtHelper: JwtHelperService) {
    if (typeof sessionStorage !== 'undefined' && sessionStorage.length > 0) {
      const savedCredentials =
        sessionStorage.getItem(credentialsKey) ||
        localStorage.getItem(credentialsKey);
      if (savedCredentials) {
        this._credentials = JSON.parse(savedCredentials);
      }
    }
  }
  public isAuthenticated(): boolean {
    // Check whether the token is expired and return
    // true or false
    if (this._credentials === undefined || this._credentials == null) {
      return false;
    }
    return !this.jwtHelper.isTokenExpired(this._credentials.token);
  }
  /**
   * Gets the user credentials.
   * @return The user credentials or null if the user is not authenticated.
   */
  get credentials(): Credentials | null {
    return this._credentials;
  }

  /**
   * Sets the user credentials.
   * The credentials may be persisted across sessions by setting the `remember` parameter to true.
   * Otherwise, the credentials are only persisted for the current session.
   * @param credentials The user credentials.
   * @param remember True to remember credentials across sessions.
   */
  setCredentials(token?: string, remember?: boolean): any {

   this._credentials = this.jwtHelper.decodeToken(token);
    if (token && token.length > 0) {
      this._credentials.token = token;

      this._credentials = this.jwtHelper.decodeToken(token);
      if (this._credentials !== null) {
        this._credentials.token = token;
      }

      const storage = remember ? localStorage : sessionStorage;
      storage.setItem(credentialsKey, JSON.stringify(this._credentials));
    } else {
      sessionStorage.removeItem(credentialsKey);
      localStorage.removeItem(credentialsKey);
      this._credentials = null;
    }

 }

  roleMatch(dataRoles: any[]): boolean {
    return (
      this.roleMatchinClaim(dataRoles, 'Menu') ||
      this.roleMatchinClaim(dataRoles, 'Storages') ||
      this.roleMatchinClaim(dataRoles, 'FormTypes') ||
      this.roleMatchinClaim(dataRoles, 'Others')
    );
  }

  roleMatchinClaim(rols: any[], claim: string): boolean {
    let isMatch = false;
    const claimRoles = this.credentials[claim]?.split('|').filter((x) => x);
    if (!claimRoles) {
      return false;
    }

    rols.forEach((dataRole: any) => {
      const y = dataRole.split(',');
      claimRoles.forEach((r: any) => {
        const role = r.split(',');
        if (role[0] == y[0]) {
          for (let i = 0; i < 4; i++) {
            if (y[1].substring(i, i + 1) == '1') {
              if (role[1].substring(i, i + 1) == '1') {
                isMatch = true;
              } else {
                isMatch = false;
                return false;
              }
            }
          }
        }
        if (isMatch) return isMatch;
      });
    });
    return isMatch;
  }
}

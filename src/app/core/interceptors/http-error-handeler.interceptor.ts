import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CredentialsService } from '../authentication/credentials.service';
import { SnackbarService } from '../services/snackbar.service';


@Injectable()
export class HttpErrorHandelerInterceptor implements HttpInterceptor {

  constructor(private router: Router, private snack: SnackbarService,
    private credit: CredentialsService, private spinner: NgxSpinnerService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: any) => {
        this.spinner.hide();
        let handled = false;
        switch (error.status) {
          case 500:
            this.snack.showError(error.error.Message);
            handled = true;
            break;
          case 401:      // login
            this.credit.setCredentials();
            this.router.navigateByUrl('');
            handled = true;
            break;
          case 403:     // forbidden
            this.router.navigateByUrl('/forbidden');
            handled = true;
            break;
        }
        if (handled) {
          return of(error);
        } else {
          return throwError(error);
        }

      }));
  }
}

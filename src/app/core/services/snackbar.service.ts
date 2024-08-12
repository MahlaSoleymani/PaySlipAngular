import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from 'src/app/shared/components/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) { }

  showError(content: string) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: { content, styles: ['alert-danger'] },
    });
  }

  showSuccess(content: string) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: { content, styles: ['alert-success'] },
    });
  }
}

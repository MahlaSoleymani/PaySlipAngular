import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RepositoryService } from 'src/app/core/http/repository.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SnackbarService } from 'src/app/core/services/snackbar.service';

@Component({
  selector: 'app-reject-time-off',
  templateUrl: './reject-time-off.component.html',
  styleUrls: ['./reject-time-off.component.scss'],
})
export class RejectTimeOffComponent {

  dto = {
    id: undefined,
    reason: undefined
  }

  constructor(
    private snack: SnackbarService,
    private rep: RepositoryService,
    private spinner: NgxSpinnerService,
    public dialogRef: MatDialogRef<RejectTimeOffComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  close() {
    this.dialogRef.close();
  }

  reject() {
    this.spinner.show();
    this.dto.id = this.data.id;
    this.rep
      .update('TimeOff/Reject', this.dto)
      .subscribe((res: any) => {
        this.spinner.hide();
        this.snack.showSuccess('مرخصی رد شد');
        this.dialogRef.close();
      });
  }
}

import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CredentialsService } from 'src/app/core/authentication/credentials.service';
import { RepositoryService } from 'src/app/core/http/repository.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ITime } from '@candidosales/material-time-picker/lib/w-clock/w-clock.component';

@Component({
  selector: 'app-edit-time-off',
  templateUrl: './edit-time-off.component.html',
  styleUrls: ['./edit-time-off.component.scss'],
})
export class EditTimeOffComponent {
  editFrm: FormGroup;
  timeOffId: any;
  timeoff: any;
  string: string;
  date: string;
  fromDate:ITime;
  toDate:ITime;
  exportTime:ITime = { hour: 0, minute: 0, meriden: 'PM', format: 12 };

  timeTypes: any = [
    { id: 1, name: 'ساعتی' },
    { id: 2, name: 'روزانه' },
  ];
  
  constructor(
    public dialogRef: MatDialogRef<EditTimeOffComponent>,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private rep: RepositoryService,
    public credit: CredentialsService,
    private snack: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.timeoff = data.timeoffData;
  }

  ngOnInit(): void {
    this.creatForm();
    Object.keys(this.editFrm.controls).forEach((key) => {
      this.editFrm.controls[key].setValue(this.timeoff[key]);
    });

    if (this.timeoff.timeType == 1) {
      var fd = this.editFrm.controls.fromDate.value;
      var td = this.editFrm.controls.toDate.value;
  
      this.fromDate = { hour: fd.substring(0,2) , minute: fd.substring(3,5), meriden: 'AM', format: 24 };
      this.toDate = { hour: td.substring(0,2) , minute: td.substring(3,5), meriden: 'AM', format: 24 };
    }

    if (this.timeoff.timeType == 2) {
//روزانه
    }
  }

  creatForm() {
    this.editFrm = this.fb.group({
      id: ['', Validators.required],
      toDate: ['', Validators.required],
      fromDate: ['', Validators.required],
      timeType: ['', Validators.required],
      type: ['', Validators.required],
      details: ['', Validators.required],
      dateTime: ['', Validators.required],
      status: ['', ''],
    });
  }


  edit() {
    if (this.timeoff.timeType == 1) {
      this.editFrm.controls.fromDate.setValue(
        this.editFrm.controls.fromDate.value +
          ' ' +
          this.editFrm.controls.dateTime.value
      );
      this.editFrm.controls.toDate.setValue(
        this.editFrm.controls.toDate.value +
          ' ' +
          this.editFrm.controls.dateTime.value
      );
    }

    this.spinner.show();
    this.editFrm.controls.status.setValue(this.data.timeoffData.status);
    this.rep
      .update('TimeOff/Edit', this.editFrm.value)
      .subscribe((res: any) => {
        if (res.isSuccess) {
          this.spinner.hide();
          this.dialogRef.close();
          this.snack.showSuccess('عملیات با موفقیت انجام شد');
        }
      });
  }

  close() {
    this.dialogRef.close();
  }
}

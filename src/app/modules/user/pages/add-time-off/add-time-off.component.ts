import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CredentialsService } from 'src/app/core/authentication/credentials.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { RepositoryService } from 'src/app/core/http/repository.service';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ITime } from '@candidosales/material-time-picker/lib/w-clock/w-clock.component';
// import { JalaliMomentDateAdapter } from './../mat-core/jalali-moment-date-adapter';

@Component({
  selector: 'app-add-time-off',
  templateUrl: './add-time-off.component.html',
  styleUrls: ['./add-time-off.component.scss'],
})
export class AddTimeOffComponent implements OnInit {
  // adapter: JalaliMomentDateAdapter;
  addFrm: FormGroup;
  timeType;
  _data: any;
  exportTime: ITime = { hour: 0, minute: 0, meriden: 'PM', format: 12 };
  time;



  timeTypes: any = [
    { id: 1, name: 'ساعتی' },
    { id: 2, name: 'روزانه' },
  ];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddTimeOffComponent>,
    private spinner: NgxSpinnerService,
    private rep: RepositoryService,
    public credit: CredentialsService,
    private snack: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this._data = data;
    console.log(this._data);
  }

  ngOnInit(): void {
    this.creatForm();
  }

  creatForm() {
    this.addFrm = this.fb.group({
      toDate: ['', Validators.required],
      fromDate: ['', Validators.required],
      timeType: ['', Validators.required],
      type: ['', Validators.required],
      details: ['', Validators.required],
      dateTime: ['', Validators.required],
    });
  }

  addTimeOff() {
    if (this.addFrm.controls.timeType.value == 1) {
      var dateTime: string = this.addFrm.controls.dateTime.value.toISOString();
      this.addFrm.controls.fromDate.setValue(
        dateTime.substring(0, 10) + ' ' + this.addFrm.controls.fromDate.value
      );
      this.addFrm.controls.toDate.setValue(
        dateTime.substring(0, 10) + ' ' + this.addFrm.controls.toDate.value
      );
      
      this.addFrm.controls.dateTime.setValue('');
    }

    if (this.addFrm.controls.timeType.value == 2) {
      var fromDate: string = this.addFrm.controls.fromDate.value.toISOString();
      this.addFrm.controls.fromDate.setValue(fromDate.substring(0, 10));

      var toDate: string = this.addFrm.controls.toDate.value.toISOString();
      this.addFrm.controls.toDate.setValue(toDate.substring(0, 10));
    }

    this.spinner.show();
    this.rep.post('TimeOff/Add', this.addFrm.value).subscribe((res: any) => {
      this.spinner.hide();
      this.snack.showSuccess('عملیات با موفقیت انجام شد');
      this.dialogRef.close();
    });
  }

  close() {
    this.dialogRef.close();
  }

  moveToNext(event) {
    event.focus();
  }

  onChangetoDate(event) {
    let time = event.hour + ':' + event.minute + ' ' + event.meriden;
    this.addFrm.controls.toDate.setValue(time);
  }

  onChangefromDate(event) {
    let time = event.hour + ':' + event.minute + ' ' + event.meriden;
    this.addFrm.controls.fromDate.setValue(time);
  }
}

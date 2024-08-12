import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RepositoryService } from 'src/app/core/http/repository.service';
import { ShowMessageDialogService } from 'src/app/core/services/show-message-dialog.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SnackbarService } from 'src/app/core/services/snackbar.service';

@Component({
  selector: 'app-add-config',
  templateUrl: './add-config.component.html',
  styleUrls: ['./add-config.component.scss'],
})
export class AddConfigComponent implements OnInit {
  years: Number[];
  months: Number[];
  addFrm: FormGroup;

  @Input() yearFrom: number = 1350;
  @Input() yearTo: number = 1403;

  constructor(
    private fb: FormBuilder,
    private rep: RepositoryService,
    private spinner: NgxSpinnerService,
    private snack: SnackbarService,
    public dialogRef: MatDialogRef<AddConfigComponent>
  ) { }
  
  ngOnInit(): void {
    this.years = Array(this.yearTo - this.yearFrom + 1)
      .fill(0)
      .map((e, i) => this.yearTo - i);
    this.months = Array(12)
      .fill(0)
      .map((e, i) => i + 1);

    this.creatFrm();
  }

  creatFrm() {
    this.addFrm = this.fb.group({
      name: ['', ''],
      year: ['', ''],
      // month: ['', ''],
      mission: ['', ''],
      childAllowance: ['', ''],
      workerInsurancePremium: ['', ''],
      employerInsurancePremium: ['', ''],
      housing: ['', ''],
      dayliSalary: ['', ''],
      overtime: ['', ''],
      lowTimeWork: ['', ''],
    });
  }

  submit() {
    this.spinner.show();
    this.rep.post('Config/Add', this.addFrm.value).subscribe((res: any) => {

      if (res.isSuccess) {
        this.spinner.hide();
        this.dialogRef.close();
        this.snack.showSuccess('عملیات با موفقیت انجام شد')
      }
    });
  }

  close() {
    this.dialogRef.close();
  }

  moveToNext(event) {
    event.focus();
  }
}

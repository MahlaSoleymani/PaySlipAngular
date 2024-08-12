import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RepositoryService } from 'src/app/core/http/repository.service';
import { ShowMessageDialogService } from 'src/app/core/services/show-message-dialog.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { AddConfigComponent } from '../add-config/add-config.component';

@Component({
  selector: 'app-edit-config',
  templateUrl: './edit-config.component.html',
  styleUrls: ['./edit-config.component.scss'],
})
export class EditConfigComponent {
  years: Number[];
  months: Number[];
  editFrm: FormGroup;

  @Input() yearFrom: number = 1350;
  @Input() yearTo: number = 1403;
  constructor(
    private fb: FormBuilder,
    private rep: RepositoryService,
    private showDlg: ShowMessageDialogService,
    private dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private snack: SnackbarService,
    public dialogRef: MatDialogRef<EditConfigComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.years = Array(this.yearTo - this.yearFrom + 1)
      .fill(0)
      .map((e, i) => this.yearTo - i);
    this.months = Array(12)
      .fill(0)
      .map((e, i) => i + 1);

    this.creatFrm();

    Object.keys(this.editFrm.controls).forEach((key) => {
      this.editFrm.controls[key].setValue(this.data.configData[key]);
    });
  }
  creatFrm() {
    this.editFrm = this.fb.group({
      id:['',Validators.required],
      name: ['', Validators.required],
      year: ['', Validators.required],
      // month: ['', Validators.required],
      mission: ['', Validators.required],
      childAllowance: ['', Validators.required],
      workerInsurancePremium: ['', Validators.required],
      employerInsurancePremium: ['', Validators.required],
      housing: ['', Validators.required],
      taxPercentage: ['', Validators.required],
      dayliSalary: ['', Validators.required],
      overtime: ['', Validators.required],
      lowTimeWork: ['', Validators.required],
    });
  }

  submit(){
   this.spinner.show();
    this.rep.update('Config/Edit',this.editFrm.value).subscribe((res: any) => {
      if (res.isSuccess) {
        this.spinner.hide();
        this.dialogRef.close();
        this.snack.showSuccess('عملیات با موفقیت انجام شد')
      }

    })
  }

  close() {
    this.dialogRef.close();
  }

  moveToNext(event) {
    event.focus();
  }
}

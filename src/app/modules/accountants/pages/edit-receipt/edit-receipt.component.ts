import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { RepositoryService } from 'src/app/core/http/repository.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SnackbarService } from 'src/app/core/services/snackbar.service';

@Component({
  selector: 'app-edit-receipt',
  templateUrl: './edit-receipt.component.html',
  styleUrls: ['./edit-receipt.component.scss'],
})
export class EditReceiptComponent {
  years: Number[];
  months: Number[];
  editFrm: FormGroup;
  sum:number;
  deduction:number;

  @Input() yearFrom: number = 1350;
  @Input() yearTo: number = 1403;

  constructor(
    private fb: FormBuilder,
    private rep: RepositoryService,
    private dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private snack: SnackbarService,
    public dialogRef: MatDialogRef<EditReceiptComponent>,
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
    
    this.data.receiptData.month = '0'+ this.data.receiptData.month;

    Object.keys(this.editFrm.controls).forEach((key) => {
      this.editFrm.controls[key].setValue(this.data.receiptData[key]);
    });
  }
  creatFrm() {
    this.editFrm = this.fb.group({
      id: ['', ''],
      year: ['', ''],
      month: ['', ''],
      mission: ['', ''],
      missionCount: ['', ''],
      totalMission: ['', ''],
      childAllowance: ['', ''],
      childCount: ['', ''],
      totalChildAllowance: ['', ''],
      tax: ['', ''],
      workerInsurancePremium: ['', ''],
      employerInsurancePremium: ['', ''],
      housing: ['', ''],
      dayliSalary: ['', ''],
      dateCount: ['', ''],
      totalSalary: ['', ''],
      overtime: ['', ''],
      overtimeHours: ['', ''],
      totalOvertime: ['', ''],
      lowTimeWork: ['', ''],
      baseSanavat: ['', ''],
      sanavat: ['', ''],
      sanavatCount: ['', ''],
      totalSanavat: ['', ''],
      totalReward: ['', ''],
      reward: ['', ''],
      rewardCount: ['', ''],
      lowTimeWorkCount: ['', ''],
      totalLowTimeWork: ['', ''],
      sumSalary: ['', ''],
      //
      dayTimeOffMonth: ['', ''],
      hourTimeOffMonth: ['', ''],
      remainderTimeOffMonth: ['', ''],
      remainderTimeOffYear: ['', ''],
      bonus: ['', ''],
      deductions: ['', ''],
      //
      groceries: ['', ''],
      imprest: ['', ''],
      netSalary: ['', ''],
      employmentId: ['', ''],
    });
  }

  submit() {
    this.spinner.show();
    this.rep
      .update('Receipt/Edit', this.editFrm.value)
      .subscribe((res: any) => {
        if (res.isSuccess) {
          this.spinner.hide();
          this.dialogRef.close();
          this.snack.showSuccess('عملیات با موفقیت انجام شد');
        }
      });
  }

  sumInput(e1, e2, res) {
    res.value = e1.value * e2.value;
    this.editFrm.get(res.name)?.setValue(res.value);
  }


  sumSalaryNum() {
    this.sum =
      Number(this.editFrm.controls.totalSalary.value) +
      Number(this.editFrm.controls.baseSanavat.value) +
      Number(this.editFrm.controls.housing.value) +
      Number(this.editFrm.controls.totalMission.value) +
      Number(this.editFrm.controls.totalChildAllowance.value) +
      Number(this.editFrm.controls.bonus.value) +
      Number(this.editFrm.controls.totalOvertime.value);

    this.editFrm.controls.sumSalary.setValue(this.sum);
  }

  deductionsNum() {
    this.deduction =
      Number(this.editFrm.controls.totalLowTimeWork.value) +
      Number(this.editFrm.controls.imprest.value) +
      Number(this.editFrm.controls.workerInsurancePremium.value);
    this.editFrm.controls.deductions.setValue(this.deduction);
  }

  netSalaryNum() {
    this.editFrm.controls.netSalary.setValue(this.sum - this.deduction);
  }


  moveToNext(event) {
    event.focus();
  }

  goForward(stepper){
    stepper.next();
}
  close(){
    this.dialogRef.close();
  }
}

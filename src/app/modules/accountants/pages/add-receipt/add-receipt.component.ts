import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RepositoryService } from 'src/app/core/http/repository.service';
import { ShowMessageDialogService } from 'src/app/core/services/show-message-dialog.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-receipt',
  templateUrl: './add-receipt.component.html',
  styleUrls: ['./add-receipt.component.scss'],
})
export class AddReceiptComponent {
  configInput: string;
  resultConfig: any;
  searchEmployment: string;
  resultEmployment: any;
  personnelCode;
  years: Number[];
  months: Number[];
  addFrm: FormGroup;
  employmentId: number;
  sum: number;
  deduction: number;
  fileName: any;
  warning: boolean = false;

  @ViewChild('config')
  config!: ElementRef<HTMLInputElement>;

  @Input() yearFrom: number = 1350;
  @Input() yearTo: number = 1403;

  constructor(
    private fb: FormBuilder,
    private rep: RepositoryService,
    // private showDlg: ShowMessageDialogService,
    // private dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private snack: SnackbarService,
    private route: Router,
    public dialogRef: MatDialogRef<AddReceiptComponent>
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
      dateCount: [30, ''],
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

  searchConfigByName(search: any): void {
    if (search.length >= 3) {
      this.rep
        .get('Config/SearchByName?search=' + search)
        .subscribe((res: any) => {
          if (res.isSuccess) {
            this.resultConfig = res.data;
          }
        });
    }
  }

  searchEmploymentByName(search: any): void {
    if (search.length >= 3) {
      this.rep
        .get('Employment/SearchByName?search=' + search)
        .subscribe((res: any) => {
          if (res.isSuccess) {
            this.resultEmployment = res.data;
          }
        });
    }
  }

  selectConfig(id: number) {
    if (id != 0) {
      this.spinner.show();
      this.rep.get('Config/Get', id).subscribe((res: any) => {
        if (res.isSuccess) {
          this.spinner.hide();
          this.addFrm.patchValue(res.data);
        }
      });
    }
  }

  selectEmployment(id: number) {
    if (id != 0) {
      this.spinner.show();
      this.rep.get('Employment/GetForReceipt', id).subscribe((res: any) => {
        console.log(res);
        if (res.isSuccess) {
          this.employmentId = res.data.id;
          this.personnelCode = res.data.personnelCode;
          this.spinner.hide();
          this.addFrm.patchValue(res.data);
        }
      });
    }
  }

  submit() {
    this.addFrm.controls.employmentId.setValue(this.employmentId);


    this.spinner.show();
    this.rep.post('Receipt/Add', this.addFrm.value).subscribe((res: any) => {
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

  sumInput(e1, e2, res) {
    res.value = e1.value * e2.value;
    this.addFrm.get(res.name)?.setValue(res.value);
  }

  sumSalaryNum() {
    this.sum =
      Number(this.addFrm.controls.totalSalary.value) +
      Number(this.addFrm.controls.baseSanavat.value) +
      Number(this.addFrm.controls.housing.value) +
      Number(this.addFrm.controls.totalMission.value) +
      Number(this.addFrm.controls.totalChildAllowance.value) +
      Number(this.addFrm.controls.bonus.value) +
      Number(this.addFrm.controls.totalOvertime.value);

    this.addFrm.controls.sumSalary.setValue(this.sum);
  }

  deductionsNum() {
    this.deduction =
      Number(this.addFrm.controls.totalLowTimeWork.value) +
      Number(this.addFrm.controls.imprest.value) +
      Number(this.addFrm.controls.workerInsurancePremium.value);
    this.addFrm.controls.deductions.setValue(this.deduction);
  }

  netSalaryNum() {
    this.addFrm.controls.netSalary.setValue(this.sum - this.deduction);
  }

  moveToNext(event) {
    event.focus();
  }

  goForward(stepper) {
    stepper.next();
  }
}

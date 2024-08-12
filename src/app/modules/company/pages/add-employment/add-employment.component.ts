import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { RepositoryService } from 'src/app/core/http/repository.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, of as observableOf } from 'rxjs';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { CredentialsService } from 'src/app/core/authentication/credentials.service';

@Component({
  selector: 'app-add-employment',
  templateUrl: './add-employment.component.html',
  styleUrls: ['./add-employment.component.scss'],
})
export class AddEmploymentComponent implements OnInit {
  addFrm: FormGroup;
  personId: number;
  personFrm: FormGroup;
  withId: boolean = false;
  user: string;
  haveChild: boolean;
  isMale: boolean;
  shifts;

  isAddShift: boolean = false;

  @ViewChild('fullName') fullNameElementRef: ElementRef;

  constructor(
    private fb: FormBuilder,
    private rep: RepositoryService,
    private spinner: NgxSpinnerService,
    private snack: SnackbarService,
    public credit: CredentialsService,
    public dialogRef: MatDialogRef<AddEmploymentComponent>
  ) {}

  ngOnInit(): void {
    this.creatFrm();

    this.rep
      .get('Company/GetShift', this.credit.credentials.CompanyId)
      .subscribe((res) => {
        if (res.isSuccess) {
          if (res.data != null) {
            this.shifts = res.data;
          } else {
            this.isAddShift = true;
            this.shifts = { name: 'اضافه کردن شیفت', id: 0 };
          }
        } else {
          this.snack.showError(res.message);
        }
      });
  }

  creatFrm() {
    this.addFrm = this.fb.group({
      personnelCode: ['', Validators.required],
      insuranceNum: ['', Validators.required],
      startWork: ['', Validators.required],
      endWork: ['', Validators.required],
      ShiftId: ['', Validators.required],
      timeOff: ['', Validators.required],
      personId: [0, Validators.required],
      personDto: ['', Validators.required],
      isUser: ['false', Validators.required],
      userName: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      userType: [1, Validators.required],
    });

    this.personFrm = this.fb.group({
      fullName: ['', Validators.required],
      genderType: ['', Validators.required],
      nationalCode: ['', Validators.required],
      birthday: ['', Validators.required],
      militaryService: ['', Validators.required],
      maritalStatus: ['', Validators.required],
      childCount: ['', Validators.required],
      past: ['', Validators.required],
    });
  }

  clearPersonFrm() {
    this.personFrm.reset({
      'nationalCode': this.personFrm.controls.nationalCode.value,
      'fullName': '',
      'genderType': '',
     ' birthday': '',
      'militaryService': '',
      'maritalStatus': '',
     ' childCount': '',
      'past': '',
    });
  }

  getForNationalCode(event) {
    if (event.target.value.length == 10) {
      this.spinner.show();
      this.rep
        .get(
          'Person/GetForNationalCode?nationalCode=' +
            this.personFrm.controls.nationalCode.value
        )
        .subscribe((res: any) => {
          if (res.isSuccess) {
            this.spinner.hide();
            if (res.data.id != 0) {
              this.personFrm.patchValue(res.data);
              this.withId = true;
              this.personId = res.data.id;
              this.fullNameElementRef.nativeElement.focus();
            } else {
              this.withId = false;
              this.clearPersonFrm();
            }
          }
        });
    }
  }

  addEmployment() {
    if (!this.withId) {
      this.addFrm.controls.personDto.patchValue(this.personFrm.value);
      this.addFrm.controls.personId.setValue(0);
    } else {
      this.addFrm.controls.personId.setValue(this.personId);
      this.addFrm.controls.personDto = null;
    }
    if (this.personFrm.controls.genderType.value == 0)
      this.personFrm.controls.militaryService.setValue(null);

    this.spinner.show();

    this.rep.post('Employment/Add', this.addFrm.value).subscribe((res: any) => {
      if (res.isSuccess) {
        this.spinner.hide();
        this.dialogRef.close();
        this.snack.showSuccess('عملیات با موفقیت انجام شد');
      } else {
        this.snack.showError(res.message);
        console.log(res);
      }
    });
  }

  militaryServiceChange(event) {
    if (event == 1) this.personFrm.controls.militaryService.enable();
    else {
      this.personFrm.controls.militaryService.disable();
      this.personFrm.controls.militaryService.setValue(true);
    }
  }

  maritalStatusChange(event) {
    if (event == 'false') {
      this.personFrm.controls['childCount'].disable();
    }
  }

  close() {
    this.dialogRef.close();
  }

  moveToNext(event) {
    event.focus();
  }
}

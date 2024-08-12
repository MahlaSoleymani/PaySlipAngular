import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RepositoryService } from 'src/app/core/http/repository.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { CredentialsService } from 'src/app/core/authentication/credentials.service';

@Component({
  selector: 'app-edit-employment',
  templateUrl: './edit-employment.component.html',
  styleUrls: ['./edit-employment.component.scss']
})
export class EditEmploymentComponent implements OnInit {
  editFrm: FormGroup;
  nationalCode;
  personFrm: FormGroup;
  withId: boolean = true;
  user: string;
  shifts;

  constructor(
    public dialogRef: MatDialogRef<EditEmploymentComponent>,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private rep: RepositoryService,
    public credit: CredentialsService,
    private snack: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.creatFrm();
    Object.keys(this.editFrm.controls).forEach((key) => {
      this.editFrm.controls[key].setValue(this.data.empData[key]);
    });

    this.rep
    .get('Company/GetShift', this.credit.credentials.CompanyId)
    .subscribe((res) => {
      if (res.isSuccess) {
        if (res.data != null) {
          this.shifts = res.data;
        } else {
   
          this.shifts = { name: 'اضافه کردن شیفت', id: 0 };
        }
      } else {
        this.snack.showError(res.message);
      }
    });
  }

  creatFrm() {
    this.editFrm = this.fb.group({
      id:['', Validators.required],
      personnelCode: ['', Validators.required],
      insuranceNum: ['', Validators.required],
      startWork: ['', Validators.required],
      endWork: ['', Validators.required],
      timeOff: ['', Validators.required],
      shiftId: ['', Validators.required],
       });
  }
 

  edit(){
    this.spinner.show();
    this.rep.update('Employment/Edit',this.editFrm.value).subscribe((res: any) => {
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
}

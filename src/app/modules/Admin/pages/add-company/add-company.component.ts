import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { CredentialsService } from 'src/app/core/authentication/credentials.service';
import { RepositoryService } from 'src/app/core/http/repository.service';
import { SnackbarService } from 'src/app/core/services/snackbar.service';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss']
})
export class AddCompanyComponent implements OnInit {

addFrm: FormGroup;

  constructor(
    private fb: FormBuilder,
    // private showDlg: ShowMessageDialogService,
    private rep: RepositoryService,
    // private dialog: MatDialog,
    public credit: CredentialsService,
    // private showDlg: ShowMessageDialogService,
    private snack: SnackbarService,
    private spinner: NgxSpinnerService,
    public dialogRef: MatDialogRef<AddCompanyComponent>
  ) {}

  ngOnInit(): void {
    this.creatFrm();
  }

  creatFrm() {
    this.addFrm = this.fb.group({
      name: ['', Validators.required],
      nationalId: ['', Validators.required],
      address: ['', Validators.required],
      postalCode: ['', Validators.required],
      logo: ['not-logo', Validators.required],
      companyType: [0, Validators.required],
    });
  }

  addcompany(){
    this.rep.post('Company/Add' , this.addFrm.value ).subscribe((res) => {
      if (res.isSuccess) {
        this.spinner.hide();
        this.dialogRef.close();
        this.snack.showSuccess('عملیات با موفقیت انجام شد');
      }
      else {
        this.snack.showError(res.message);
        console.log(res);
      }
    })
  }
}

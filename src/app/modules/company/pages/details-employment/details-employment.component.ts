import { Component, Inject, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CredentialsService } from 'src/app/core/authentication/credentials.service';
import { RepositoryService } from 'src/app/core/http/repository.service';
import { SnackbarService } from 'src/app/core/services/snackbar.service';

@Component({
  selector: 'app-details-employment',
  templateUrl: './details-employment.component.html',
  styleUrls: ['./details-employment.component.scss'],
})
export class DetailsEmploymentComponent implements OnInit {

  detailsFrm = {
    fullName : undefined ,
    employments: undefined
    // {
      // companyName:undefined,
      // startWork:undefined,
      // endtWork:undefined,
      // isExist:undefined,
      // reason:undefined
    // }
  }

  constructor(
    public dialogRef: MatDialogRef<DetailsEmploymentComponent>,
    public credit: CredentialsService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.detailsFrm = this.data.emp;
  }

  close() {
    this.dialogRef.close();
  }
  
}

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RepositoryService } from 'src/app/core/http/repository.service';
import { ShowMessageDialogService } from 'src/app/core/services/show-message-dialog.service';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileFrm: FormGroup;
  // readonly: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<ProfileComponent>,
    private fb: FormBuilder,
    // private rep: RepositoryService,
    // private showDlg: ShowMessageDialogService,
    // private dialog: MatDialog,
    // private spinner: NgxSpinnerService,
    // private snack: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.creatFrm();
    
    this.profileFrm.patchValue(this.data);

    // if (this.readonly) {
    //   this.profileFrm.controls.maritalStatus?.disable();
    //   this.profileFrm.controls.militaryService?.disable();
    //   this.profileFrm.controls.genderType?.disable();
    // }

  }

  creatFrm() {
    this.profileFrm = this.fb.group({
      userName: ['', ''],
      fullName: ['', ''],
      nationalCode: ['', ''],
      militaryService: ['', ''],
      past: ['', ''],
      maritalStatus: ['', ''],
      childCount: ['', ''],
      genderType: ['', ''],
      birthday: ['', '']
    })
  }

  close() {
    this.dialogRef.close();
  }

  // editMode() {
  //   this.readonly = false;    
  //   this.profileFrm.controls.maritalStatus?.enable();
  //   this.profileFrm.controls.militaryService?.enable();
  //   this.profileFrm.controls.genderType?.enable();
  // }

  // readonlyMode(){
  //   this.readonly = true;    
  //   this.profileFrm.controls.maritalStatus?.disable();
  //   this.profileFrm.controls.militaryService?.disable();
  //   this.profileFrm.controls.genderType?.disable();
  // }
}

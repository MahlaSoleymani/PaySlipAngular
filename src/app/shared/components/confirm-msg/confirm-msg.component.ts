import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
export interface ConfirmDlgData {
  title: string;
  message: string;
  okCaption: string;
  cancelCaption;
}
@Component({
  selector: 'app-confirm-msg',
  templateUrl: './confirm-msg.component.html',
  styleUrls: ['./confirm-msg.component.css']
})
export class ConfirmMsgComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmMsgComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDlgData) { }

  ngOnInit() {
  }

  onOkClick(): void {
    this.dialogRef.close('yes');
  }
  onNoClick(): void {
    this.dialogRef.close('no');
  }

}

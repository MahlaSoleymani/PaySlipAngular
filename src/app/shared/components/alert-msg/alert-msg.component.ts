import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
export interface AlertDlgData {
  title: string;
  message: string;
  okCaption: string;
}

@Component({
  selector: 'app-alert-msg',
  templateUrl: './alert-msg.component.html',
  styleUrls: ['./alert-msg.component.css']
})
export class AlertMsgComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AlertMsgComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AlertDlgData) { }

  ngOnInit() {
  }

  onOkClick(): void {
    this.dialogRef.close();
  }
}

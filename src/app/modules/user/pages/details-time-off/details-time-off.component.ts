import { Component, OnInit ,Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CredentialsService } from 'src/app/core/authentication/credentials.service';

@Component({
  selector: 'app-details-time-off',
  templateUrl: './details-time-off.component.html',
  styleUrls: ['./details-time-off.component.scss']
})
export class DetailsTimeOffComponent implements OnInit{

  timeOffFrm={
    type: undefined,
    toDate: undefined,
    fromDate: undefined,
    status: undefined,
    timeType: undefined,
    details:undefined,
    reason:undefined
  };

  constructor(
    public dialogRef: MatDialogRef<DetailsTimeOffComponent>,
    public credit: CredentialsService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.timeOffFrm = this.data.timeoffData
  }

  close() {
    this.dialogRef.close();
  }

}

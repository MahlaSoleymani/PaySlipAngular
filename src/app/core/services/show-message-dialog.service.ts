import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertMsgComponent } from 'src/app/shared/components/alert-msg/alert-msg.component';
import { ConfirmMsgComponent } from 'src/app/shared/components/confirm-msg/confirm-msg.component';


@Injectable({
  providedIn: 'root'
})
export class ShowMessageDialogService {
  isDesktop: boolean;
  constructor(public dialog: MatDialog) {
    // , private applicationStateService: ApplicationStateService
    // this.isDesktop = applicationStateService.getIsDesktopResolution();
  }

  showAlert(title: string, message: string, okCaption: string = 'تایید') {
    // if (this.isDesktop) {
    //   const dialogRef = this.dialog.open(AlertMsgDesktopComponent, {
    //     data: { title: title, message: message, okCaption: okCaption }
    //   });
    // }
    //  else
    //  {
    const dialogRef = this.dialog.open(AlertMsgComponent, {
      data: { title, message, okCaption }
    });
    //   }


  }
  showConfirm(title: string, message: string, okCaption: string = 'تایید', cancelCaption: string = 'انصراف') {

    // if (this.isDesktop) {

    //   const dialogRef = this.dialog.open(ConfirmMsgDesktopComponent, {
    //     data: { title: title, message: message, okCaption: okCaption, cancelCaption: cancelCaption }
    //   });
    //   return dialogRef.afterClosed();
    // }
    // else {
    const dialogRef = this.dialog.open(ConfirmMsgComponent, {
      width: "25%",
      height: "auto",
      data: { title, message, okCaption, cancelCaption }

    });
    return dialogRef.afterClosed();
    //  }

  }
}

import { Component, Input } from '@angular/core';
import { CredentialsService } from 'src/app/core/authentication/credentials.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { RepositoryService } from 'src/app/core/http/repository.service';
import { ComponentType } from '@angular/cdk/portal';
import { HeaderItem } from '../../models/core/heder-item';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() items: HeaderItem[];

  constructor(private credit: CredentialsService, private spinner: NgxSpinnerService, private router: Router, private dialog: MatDialog, private rep: RepositoryService) { }

  openDialog(component: ComponentType<unknown>, methodType: string, url: string = null) {
    this.spinner.show();

    switch (methodType) {

      case 'get': {
        this.rep.get(url).subscribe((res) => {
          const dialogRef = this.dialog.open(component, {
            width: '40%',
            height: 'auto',
            disableClose: true,
            data: res.data
          });

        })
        break;
      }

      case 'justOpen': {
        const dialogRef = this.dialog.open(component, {
          width: '40%',
          height: 'auto',
          disableClose: true,
        });
        break;
      }
    }

    this.spinner.hide();
  }

  openLink(link) {
    //code
  }

  action(name: string, data: any) {
    switch (name) {
      case 'openDialog':
        this.openDialog(data.component, data.methodType , data.url); break;
      case 'openLink':
        this.openLink(data); break;
    }
  }

}

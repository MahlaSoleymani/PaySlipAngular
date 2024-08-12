import { Component, Input } from '@angular/core';
import { item } from '../../models/item';
import { Router } from '@angular/router';
import { CredentialsService } from 'src/app/core/authentication/credentials.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
@Input() items: item[];

constructor(private credit: CredentialsService, private router: Router) { }


logOut() {
  this.credit.setCredentials();
  this.router.navigate(['/login']);
}

}

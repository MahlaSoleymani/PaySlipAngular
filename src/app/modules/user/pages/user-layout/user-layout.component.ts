import { Component } from '@angular/core';
import { ProfileComponent } from 'src/app/shared/components/profile/profile.component';
import { HeaderItem } from 'src/app/shared/models/core/heder-item';
import { item } from 'src/app/shared/models/item';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.scss']
})
export class UserLayoutComponent {
  items: item[] =
    [
      { name: 'داشبورد', id: '/user/dashboard', icon: 'dashboard' },
      { name: 'مرخصی', id: '/user/time-off', icon: 'hail' },
    ]

  headerItems: HeaderItem[] =
    [
      { name: 'profile', id: '#', icon: 'person', actionName: 'openDialog', data: { component: ProfileComponent, methodType: 'get', url: 'User/GetProfile' }, menu: null }
    ]
}

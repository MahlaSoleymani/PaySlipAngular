import { Component } from '@angular/core';
import { ProfileComponent } from 'src/app/shared/components/profile/profile.component';
import { HeaderItem } from 'src/app/shared/models/core/heder-item';
import { item } from 'src/app/shared/models/item';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent {
  items: item[] =
    [
      { name: 'داشبورد', id: '/admin/dashboard', icon: 'dashboard' },
      { name: 'شرکت', id: '/admin/company', icon: 'apartment' },
    ]

  headerItems: HeaderItem[] =
    [
      { name: 'profile', id: '#', icon: 'person', actionName: 'openDialog', data: { component: ProfileComponent, methodType: 'get', url: 'User/GetProfile' }, menu: null }
    ]
}

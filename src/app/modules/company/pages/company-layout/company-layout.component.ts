import { Component } from '@angular/core';
import { ProfileComponent } from 'src/app/shared/components/profile/profile.component';
import { HeaderItem } from 'src/app/shared/models/core/heder-item';
import { item } from 'src/app/shared/models/item';

@Component({
  selector: 'app-company-layout',
  templateUrl: './company-layout.component.html',
  styleUrls: ['./company-layout.component.scss']
})
export class CompanyLayoutComponent {
  items: item[] =
  [
    { name: 'داشبورد', id: '/company/dashboard', icon: 'dashboard' },
    { name: 'پرسنل', id: '/company/employment', icon: 'badge' },
    { name: 'مرخصی', id: '/company/time-off', icon: 'hail' },
    { name: 'تنظیمات', id: '/company/settings', icon: 'settings' },
  ]

headerItems: HeaderItem[] =
  [
    { name: 'profile', id: '#', icon: 'person', actionName: 'openDialog', data: { component: ProfileComponent, methodType: 'get', url: 'User/GetProfile' }, menu: null }
  ]
}

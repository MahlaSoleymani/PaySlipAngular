import { Component } from '@angular/core';
import { ProfileComponent } from 'src/app/shared/components/profile/profile.component';
import { HeaderItem } from 'src/app/shared/models/core/heder-item';
import { item } from 'src/app/shared/models/item';

@Component({
  selector: 'app-accountants-layout',
  templateUrl: './accountants-layout.component.html',
  styleUrls: ['./accountants-layout.component.scss']
})
export class AccountantsLayoutComponent {
  items: item[] =
  [
    { name: 'داشبورد', id: '/accountants/dashboard', icon: 'dashboard' },
    { name: 'فیش حقوقی', id: '/accountants/receipt', icon: 'receipt' },
    { name: 'تنظیمات', id: '/accountants/settings', icon: 'settings' },
  ]

headerItems: HeaderItem[] =
  [
    { name: 'profile', id: '#', icon: 'person', actionName: 'openDialog', data: { component: ProfileComponent, methodType: 'get', url: 'User/GetProfile' }, menu: null }
  ]
}
function trigger(arg0: string, arg1: any[]): any {
  throw new Error('Function not implemented.');
}

function state(arg0: string, arg1: any): any {
  throw new Error('Function not implemented.');
}

function style(arg0: { width: string; opacity: number; }): any {
  throw new Error('Function not implemented.');
}

function animate(arg0: string): any {
  throw new Error('Function not implemented.');
}


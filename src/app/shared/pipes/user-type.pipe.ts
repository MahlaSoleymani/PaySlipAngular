import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userType'
})
export class UserType implements PipeTransform {

  transform(value: any, args?: any): any {
    switch (+value) {
      case 0: return 'کارفرما';
      case 1: return 'کارمند';
      case 2: return 'حسابدار';
      default: return 'نامشخص';
    }
  }

}
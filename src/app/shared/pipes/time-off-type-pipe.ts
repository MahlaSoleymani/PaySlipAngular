import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeOffType'
})
export class TimeOffType implements PipeTransform {

  transform(value: any, args?: any): any {
    switch (+value) {
      case 0: return '';
      case 1: return 'استحقاقی';
      case 2: return 'استعلاجی';
      default: return 'نامشخص';
    }
  }

}
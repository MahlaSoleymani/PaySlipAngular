import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeOffStatus'
})
export class TimeOffStatus implements PipeTransform {

  transform(value: any, args?: any): any {
    switch (+value) {
      case 0: return '';
      case 1: return ' در انتظار تایید' ;
      case 2: return 'تایید شده';
      case 3: return 'رد شده';
      default: return 'نامشخص';
    }
  }

}
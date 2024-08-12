import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeType'
})
export class TimeType implements PipeTransform {

  transform(value: any, args?: any): any {
    switch (+value) {
      case 0: return '';
      case 1: return 'ساعتی';
      case 2: return 'روزانه';
      default: return 'نامشخص';
    }
  }

}
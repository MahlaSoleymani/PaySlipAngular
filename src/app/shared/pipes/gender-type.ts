import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genderType'
})
export class GenderType implements PipeTransform {

  transform(value: any, args?: any): any {
    switch (+value) {
      case 0: return 'زن';
      case 1: return 'مرد';
      default: return 'نامشخص';
    }
  }

}
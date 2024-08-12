import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'monthPipe'
})
export class MonthPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    switch (+value) {
      case 0: return 'فروردین';
      case 2: return 'اردیبهشت';
      case 3: return 'خرداد';
      case 4: return 'تیر';
      case 5: return 'مرداد';
      case 6: return 'شهریور';
      case 7: return 'مهر';
      case 8: return 'ابان';
      case 9: return 'اذر';
      case 10: return 'دی';
      case 11: return 'بهمن';
      case 12: return 'اسفند';
      default: return 'نامشخص';

    }
  }

}
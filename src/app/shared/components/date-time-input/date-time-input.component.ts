import {
  Component,
  forwardRef,
  Input,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-date-time-input',
  templateUrl: './date-time-input.component.html',
  styleUrls: ['./date-time-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateTimeInputComponent),
      multi: true,
    },
  ],
})
export class DateTimeInputComponent implements ControlValueAccessor {
  @Input() showDate: boolean = true;
  @Input() showTime: boolean = false;
  @Input() timeLable: string;
  @Input() dateLable: string;
  @Input() separator: string = '/';
  @Input() yearFrom: number = 1310;
  @Input() yearTo: number = 1403;
  @Input() minuteInterval: number = 1;
  @Input() startMins: number;
  @Input() endMins: number;
  @Input() startHours: number;
  @Input() endHours: number;
  years: number[];
  mins: number[];
  days: number[];
  months: number[];
  hours: number[];
  year: string; // this is the updated value that the class accesses
  month: string; // this is the updated value that the class accesses
  day: string; // this is the updated value that the class accesses
  hour: string; // this is the updated value that the class accesses
  miniute: string; // this is the updated value that the class accesses
  required = true;


  constructor() { }
  ngOnInit() {
    this.years = Array(this.yearTo - this.yearFrom + 1)
      .fill(0)
      .map((e, i) => this.yearTo - i);
    //   this.mins = Array(60).fill(0).map((e, i) => i + 1);

    this.days = Array(31)
      .fill(0)
      .map((e, i) => i + 1);

    this.months = Array(12)
      .fill(0)
      .map((e, i) => i + 1);

    this.hours = Array(24)
      .fill(0)
      .map((e, i) => i);

    this.mins = [];
    for (let i = 0; i < 60; i += this.minuteInterval) {
      this.mins.push(i);
    }

    //#region 
    // this.mins = [];
    // let sm = 0;
    // let em = 59;

    // console.log('startMins' + this.startMins);

    // if (this.startMins != undefined) {
    //   sm = this.startMins;
    //   console.log('sm' + sm);

    // }

    // if (this.endMins != undefined){
    //   em = this.endMins;
    //   console.log('endMins' + this.endMins);

    // }


    // for (sm; sm == em; sm += this.minuteInterval) {
    //   this.mins.push(sm);

    //   console.log('sm' + sm);
    //   console.log('em' + em);
    // }


    // let sh = 0;
    // let eh = 23;
    // if (this.startHours != undefined) {
    //   sh = this.startHours;
    // }
    // if (this.endHours != undefined) {
    //   eh = this.endHours;
    // }

    // this.hours = Array()
    //   .fill(0, sh ,eh)
    //   .map((e, h) => h);
    //   console.log('miniuts' + this.miniute);

    //#endregion

  }
  writeValue(obj: string): void {
    if (obj === null || obj === undefined) {
      this.value = undefined; 
      return;
    }
    if (this.showDate && this.showTime && obj.length !== 16) {
      return;
    }
    if (this.showDate && !this.showTime && obj.length !== 10) {
      return;
    }
    if (!this.showDate && this.showTime && obj.length !== 5) {
      return;
    }
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  onChange: any = () => { };
  onTouch: any = () => { };
  set value(val: string) {
    // this value is updated by programmatic changes if( val !== undefined && this.val !== val){
    if (val !== null && val !== undefined && this.generateFullValue() !== val) {
      if (this.showDate && this.showTime) {
        const sp1 = val.split(' ');
        const datePart = sp1[0].split(this.separator);
        const timePart = sp1[1].split(':');

        this.year = datePart[0];
        this.month = datePart[1];
        this.day = datePart[2];

        this.hour = timePart[0];
        this.miniute = timePart[1];
      }
      if (!this.showDate && this.showTime) {
        const timePart = val.split(':');

        this.hour = timePart[0];
        // this.hour =  parseInt(timePart[0]);

        this.miniute = timePart[1];
      }
      if (this.showDate && !this.showTime) {
        const datePart = val.split(this.separator);
        this.year = datePart[0];
        this.month = datePart[1];
        this.day = datePart[2];
      }
    }
    this.onChange(val);
    this.onTouch(val);
  }

  generateFullValue() {
    if (this.showDate && this.showTime) {
      return `${this.year}${this.separator}${this.month}${this.separator}${this.day} ${this.hour}:${this.miniute}`;
    }
    if (!this.showDate && this.showTime) {
      return `${this.hour}:${this.miniute}`;
    }
    if (this.showDate && !this.showTime) {
      return `${this.year}${this.separator}${this.month}${this.separator}${this.day}`;
    }
    return undefined;
  }

  clear() {
    this.year = '';
    this.month = '';
    this.day = '';
    this.hour = '';
    this.miniute = '';
    this.required = false;
  }
}

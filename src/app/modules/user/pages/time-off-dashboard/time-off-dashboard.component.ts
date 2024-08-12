import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, catchError, map, merge, retry, startWith, switchMap } from 'rxjs';
import { RepositoryService } from 'src/app/core/http/repository.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import {
  Credentials,
  CredentialsService,
} from 'src/app/core/authentication/credentials.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { EditTimeOffComponent } from '../edit-time-off/edit-time-off.component';
import { ShowMessageDialogService } from 'src/app/core/services/show-message-dialog.service';
import { AddTimeOffComponent } from '../add-time-off/add-time-off.component';
import { DetailsTimeOffComponent } from '../details-time-off/details-time-off.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { transition } from '@angular/animations';

@Component({
  selector: 'app-time-off-dashboard',
  templateUrl: './time-off-dashboard.component.html',
  styleUrls: ['./time-off-dashboard.component.scss']
})
export class TimeOffDashboardComponent implements OnInit {
  displayedColumns: string[] = [
    'status',
    'timeOffType',
    'details',
    'timeType',
    'fromDate',
    'toDate',
    'action',
  ];
  search;

  isExpanded = false;

  showAddText:boolean;
  tData;
  columns: string[] = [
    // 'وضعیت',
    'نوع',
    'توضیحات',
    'نوع',
    'زمان',  
    // ' ',  
  ]

  bColor: string[] = [
    '##fff3c9ff',
    '#AAD7D9',
    '#f8edffff',
    '#F5EEE6',
    '#d7faf3ff',
    '#FFEAA7',
    '#F6D6D6',
    '#FFE5E5',
    '#E0AED0',
    '#D7E5CA',
    '#EEE0C9',
    '#FAF3F0',
    '#CDE990',
    '#FFFBAC',
    '#FFD495',
    '#FADA9D',
    '#E5E0FF',
    '#FFF2F2',
    '#FDFDBD',
    '#CDFCF6',
    '#B5DEFF',
  ];

  totalRecords = 0;
  userInfo: Credentials;
  filterForm: FormGroup;
  filterChips: any[];

  timeTypes: any = [
    { id: 1, name: 'ساعتی' },
    { id: 2, name: 'روزانه' },
  ];

  types: any = [
    { id: 1, name: 'استحقاقی' },
    { id: 2, name: 'استعلاجی' },
  ];

  status: any = [
    { id: 1, name: 'در حال انتظار ' },
    { id: 2, name: 'پذیرفته شده' },
    { id: 3, name: 'رد شده' },
  ];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  dataSource = new MatTableDataSource<any>();
  dataSourceChangeSubject = new Subject();

  constructor(
    private dp: DecimalPipe,
    private fb: FormBuilder,
    private showDlg: ShowMessageDialogService,
    private rep: RepositoryService,
    private dialog: MatDialog,
    public credit: CredentialsService,
    private snack: SnackbarService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    // this.dataSource.sort = this.sort;
    // this.searchFilter();
    // this.resetPaging()

    this.creatForm();
    this.userInfo = this.credit.credentials;
  }

  ngAfterViewInit() {
    this.searchFilter();
  }

  creatForm() {
    this.filterForm = this.fb.group({
      type: [0, ''],
      search: ['', ''],
      before: ['', ''],
      after: ['', ''],
      timeOffStatus: [0, ''],
      timeType: [0, ''],
    });
  }

  showAll() {
    this.filterForm = this.fb.group({
      type: [0, ''],
      search: ['', ''],
      before: ['', ''],
      after: ['', ''],
      timeOffStatus: [0, ''],
      timeType: [0, ''],
    });
    this.dataSourceChangeSubject.next(0);
  }

  searchFilter() {
    this.spinner.show();
    this.filterForm.controls.search.setValue(this.search);
   this.filterChips = this.createFilterChip(this.filterForm.value);
    merge(
      this.sort.sortChange,
      this.paginator.page,
      this.dataSourceChangeSubject
    )
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.rep.post('TimeOff/Get', {
            sort: this.sort?.active,
            order: this.sort?.direction,
            index: this.paginator?.pageIndex,
            count: this.paginator?.pageSize,
            search: this.filterForm.controls.search.value,
            Before: this.filterForm.controls.before.value,
            After: this.filterForm.controls.after.value,
            Type: this.filterForm.controls.type.value,
            Status: this.filterForm.controls.timeOffStatus.value,
            TimeType: this.filterForm.controls.timeType.value,
          });
        }),
        map((res: any) => {
          this.spinner.hide();
          this.totalRecords = res.totalRecord;
          return res.data;
        }),
        catchError(() => {
          this.spinner.hide();
          return '';
        })
      )
      .subscribe((res: any) => {
        this.tData = res;
        this.dataSource = res;
        // this.generateRows(res);
      });
  }

  edit(timeoff: any) {
    this.rep.get('TimeOff/Get', timeoff.id).subscribe((response: any) => {
      const dialogRef = this.dialog.open(EditTimeOffComponent, {
        width: '30%',
        height: 'auto%',
        panelClass: 'dialog-radius',
        disableClose: true,
        data: {
          timeoffData: response.data,
        },
      });
      dialogRef.afterClosed().subscribe((result: any) => {
        this.dataSourceChangeSubject.next(result);
      });
    });

  }

  createFilterChip(filterData: any) {
    var chips = [];
    if (filterData.type != 0) {
      let type = this.types.find((item) => item.id == filterData.type);
      chips.push({ id: 1, name: type.name });
    }

    if (filterData.after != '') {
      chips.push({ id: 2, name: filterData.after });
    }

    if (filterData.before != '') {
      chips.push({ id: 3, name: filterData.before });
    }

    if (filterData.timeOffStatus != 0) {
      let status = this.status.find(
        (item) => item.id == filterData.timeOffStatus
      );
      chips.push({ id: 4, name: status.name });
    }

    if (filterData.timeType != 0) {
      let timeType = this.timeTypes.find(
        (item) => item.id == filterData.timeType
      );
      chips.push({ id: 5, name: timeType.name });
    }
    return chips;
  }

  resetPaging(): void {
    this.paginator.pageIndex = 0;
  }

  deleteDlg(timeOff) {
    this.showDlg
      .showConfirm('آیا مایل به حذف مرخصی موردنظر هستید؟', '')
      .subscribe((result) => {
        if (result === 'yes') {
          this.spinner.show();
          this.rep.delete('TimeOff/Delete', timeOff.id).subscribe((res) => {
            // this.dataSource = this.dataSource.filter(f => f.id !== id);
            this.spinner.hide();
            this.dataSourceChangeSubject.next(res.data);
            this.snack.showSuccess('مرخصی مورنظر حذف شد');
          });
        }
      });
  }

  timeOffSubmit() {
    // this.rep.get('TimeOff/GetForAdd').subscribe((res) => {
    //   const dialogRef = this.dialog.open(AddTimeOffComponent, {
    //     width: '30%',
    //     height: 'auto',
    //     panelClass: 'dialog-radius',
    //     disableClose: true,
    //     data: res.data,
    //   });
    //   dialogRef.afterClosed().subscribe((result: any) => {
    //     this.dataSourceChangeSubject.next(result);
    //   });
    // });

    const dialogRef = this.dialog.open(AddTimeOffComponent, {
      width: '30%',
      height: 'auto',
      panelClass: 'dialog-radius',
      disableClose: true,
      data: undefined,
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.dataSourceChangeSubject.next(result)})
  }

  GetDetails(timeOff) {
    this.spinner.show();
    this.rep.get('TimeOff/Get', timeOff.id).subscribe((res: any) => {
      this.spinner.hide();
      const dialogRef = this.dialog.open(DetailsTimeOffComponent, {
        width: '30%',
        height: 'auto',
        panelClass: 'dialog-aa',
        disableClose: true,
        data: {
          timeoffData: res.data,
        },
      });
    });
  }

  removeFilter(filter: any): void {
    switch (filter) {
      case 1:
        this.filterForm.controls.type.setValue(0);
        break;
      case 2:
        this.filterForm.controls.after.setValue(undefined);
        break;
      case 3:
        this.filterForm.controls.before.setValue(undefined);
        break;
      case 4:
        this.filterForm.controls.timeOffStatus.setValue(0);
        break;
      case 5:
        this.filterForm.controls.timeType.setValue(0);
        break;
      default:
        break;
    }

    this.searchFilter();
  }

  getStatusColor(status) {
    if(status == 0)
      return "#b4e4ff";
    else if(status == 1)
    return "#FDE767";
    else if(status == 2)
    return "#9ADE7B";
    else if (status == 3)
    return "#ff6138"
  }

  getRandomColor(){
   const random = Math.floor(Math.random() * this.bColor.length);
    return this.bColor[random];
  }

  toggleExpansion(): void {
    this.isExpanded = !this.isExpanded;
  }

  closeDiv(): void {
    this.isExpanded = false;
    this.searchFilter();
  }


}


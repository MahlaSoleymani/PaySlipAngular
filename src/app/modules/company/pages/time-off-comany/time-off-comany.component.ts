import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, catchError, map, merge, startWith, switchMap } from 'rxjs';
import { RepositoryService } from 'src/app/core/http/repository.service';
import { MatDialog } from '@angular/material/dialog';
import { CredentialsService } from 'src/app/core/authentication/credentials.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { ShowMessageDialogService } from 'src/app/core/services/show-message-dialog.service';
import { EditTimeOffComponent } from 'src/app/modules/user/pages/edit-time-off/edit-time-off.component';
import { AddTimeOffComponent } from 'src/app/modules/user/pages/add-time-off/add-time-off.component';
import { DetailsTimeOffComponent } from 'src/app/modules/user/pages/details-time-off/details-time-off.component';
import { RejectTimeOffComponent } from '../reject-time-off/reject-time-off.component';

@Component({
  selector: 'app-time-off-comany',
  templateUrl: './time-off-comany.component.html',
  styleUrls: ['./time-off-comany.component.scss'],
})
export class TimeOffComanyComponent implements OnInit {
  displayedColumns: string[] = [
    'status',
    'fullName',
    'type',
    'timeType',
    'dateTime',
    'action',
  ];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  totalRecords = 0;
  isExpanded = false;

  showAddText:boolean;

  filterForm = {
    type: 0,
    search: undefined,
    before: undefined,
    after: undefined,
    timeOffStatus: 0,
    timeType: 0,
  };
  filterChips: any[];
  timeTypes: any = [
    { id: 1, name: 'ساعتی' },
    { id: 2, name: 'روزانه' }
  ];

  types: any = [
    { id: 1, name: 'استحقاقی' },
    { id: 2, name: 'استعلاجی' }
  ]

  status: any = [
    { id: 1, name: 'در حال انتظار ' },
    { id: 2, name: 'پذیرفته شده' },
    { id: 3, name: 'رد شده' }
  ]

  dataSource = new MatTableDataSource<any>();
  dataSourceChangeSubject = new Subject();

  constructor(
    private showDlg: ShowMessageDialogService,
    private rep: RepositoryService,
    private dialog: MatDialog,
    public credit: CredentialsService,
    // private showDlg: ShowMessageDialogService,
    private snack: SnackbarService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.searchFilter();
  }

  showAll() {
    this.filterForm = {
      type: undefined,
      search: undefined,
      before: undefined,
      after: undefined,
      timeOffStatus: undefined,
      timeType: undefined,
    };
    this.dataSourceChangeSubject.next(0);
  }

  searchFilter() {
    this.spinner.show();

    this.filterChips = this.createFilterChip(this.filterForm);

    merge(
      this.sort.sortChange,
      this.paginator.page,
      this.dataSourceChangeSubject
    )
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.rep.post('TimeOff/GetForCompany', {
            sort: this.sort?.active,
            order: this.sort?.direction,
            index: this.paginator?.pageIndex,
            count: this.paginator?.pageSize,
            Search: this.filterForm.search,
            Before: this.filterForm.before,
            After: this.filterForm.after,
            Type: this.filterForm.type,
            Status: this.filterForm.timeOffStatus,
            TimeType: this.filterForm.timeType,
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
          this.dataSource = res;
      });
  }

  edit(timeoff: any) {
    this.rep.get('TimeOff/Get', timeoff.id).subscribe((response: any) => {
      const dialogRef = this.dialog.open(EditTimeOffComponent, {
        width: '30%',
        height: 'auto%',
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

  deleteDlg(timeOff) {
    this.showDlg
      .showConfirm('آیا مایل به حذف مرخصی موردنظر هستید؟', '')
      .subscribe((result) => {
        if (result === 'yes') {
          this.spinner.show();
          this.rep.delete('TimeOff/Delete', timeOff.id).subscribe((res) => {
            // this.dataSource = this.dataSource.filter(f => f.id !== id);
            this.spinner.hide();
            this.dataSourceChangeSubject.next(timeOff.id);
            this.snack.showSuccess('مرخصی مورنظر حذف شد');
          });
        }
      });
  }

  timeOffSubmit() {
    const dialogRef = this.dialog.open(AddTimeOffComponent, {
      width: '30%',
        height: 'auto%',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.dataSourceChangeSubject.next(result);
    });
  }

  accept(timeoff: any) {
    this.showDlg
      .showConfirm('آیا مایل به پذیرش مرخصی موردنظر هستید؟', '')
      .subscribe((result) => {
        if (result === 'yes') {
          this.spinner.show();
          this.rep.updateById('TimeOff/Accept', timeoff.id).subscribe((res) => {
            this.spinner.hide();
            this.snack.showSuccess('مرخصی پذیرفته شد');
            this.dataSourceChangeSubject.next(res);
          });
         
        }
      });
  }

  reject(timeoff: any) {
    const dialogRef = this.dialog.open(RejectTimeOffComponent, {
      width: '30%',
      height: 'auto',
      panelClass: 'dialog-aa',
      disableClose: true,
      data: {
        id: timeoff.id,
      },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.dataSourceChangeSubject.next(result);
    });
  }

  GetDetails(timeOff) {
    this.rep.get('TimeOff/Get', timeOff.id).subscribe((res: any) => {
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

  createFilterChip(filterData: any) {
    var chips = [];
    if (filterData.type != 0) {
      let type = this.types.find((item) => item.id == filterData.type);
      chips.push({ id: 1, name: type.name });
    }

    if (filterData.after != undefined) {
      chips.push({ id: 2, name: filterData.after });
    }

    if (filterData.before != undefined) {
      chips.push({ id: 3, name: filterData.before });
    }

    if (filterData.timeOffStatus != 0) {
      let status = this.status.find((item => item.id == filterData.timeOffStatus));
      chips.push({ id: 4, name: status.name })
    }

    if (filterData.timeType != 0) {
      let timeType = this.timeTypes.find((item) => item.id == filterData.timeType)
      chips.push({ id: 5, name: timeType.name });
    }
    return chips;
  }

  removeFilter(filter: any): void {
    switch (filter) {
      case 1:
        this.filterForm.type=0;
        break;
      case 2:
        this.filterForm.after=undefined;
        break;
      case 3:
        this.filterForm.before=undefined;
        break;
      case 4:
        this.filterForm.timeOffStatus=0;
        break;
      case 5:
        this.filterForm.timeType=0;
        break;
      default:
        break;

    }

    this.searchFilter();
  }

  closeDiv(): void {
    this.isExpanded = false;
    this.searchFilter();
  }

  toggleExpansion(): void {
    this.isExpanded = !this.isExpanded;
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

}

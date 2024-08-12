import { Component, Input, OnInit, ViewChild } from '@angular/core';
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
import { EditConfigComponent } from '../edit-config/edit-config.component';
import { AddConfigComponent } from '../add-config/add-config.component';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss'],
})
export class ConfigComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'year',

    'action',
  ];
  filterChips: any[];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  totalRecords = 0;
  isExpanded = false;

  showAddText:boolean;

 years:Number[];
 months:Number[];

 @Input() yearFrom: number = 1350;
 @Input() yearTo: number = 1403;

  ngOnInit(): void {
    this.years = Array(this.yearTo - this.yearFrom + 1).fill(0).map((e, i) => this.yearTo - i);
    this.months = Array(12).fill(0).map((e, i) => i + 1);  }


  filterForm = {
    type: 0,
    search: undefined,
    year: undefined,
    month:undefined,
  };

  dataSource = new MatTableDataSource<any>();
  dataSourceChangeSubject = new Subject();
  
  ngAfterViewInit() {
    this.searchFilter();
  }


  constructor(
    private showDlg: ShowMessageDialogService,
    private rep: RepositoryService,
    private dialog: MatDialog,
    public credit: CredentialsService,
    // private showDlg: ShowMessageDialogService,
    private snack: SnackbarService,
    private spinner: NgxSpinnerService
  ) {}
  
  showAll() {
    this.filterForm = {
      type: undefined,
      search: undefined,
      year: undefined,
      month:undefined,
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
          return this.rep.get(
            'Config/Get' +
              this.rep.generatePaginateion(
                this.paginator.pageIndex,
                this.paginator.pageSize,
                this.sort.active,
                this.sort.direction,
                'search',
                this.filterForm.search,
                'year', this.filterForm.year,
                'month', this.filterForm.month
              )
          );
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

  edit(config: any) {
    this.rep.get('config/Get', config.id).subscribe((response: any) => {
      const dialogRef = this.dialog.open(EditConfigComponent, {
        width: '40%',
        height: 'auto',
        disableClose: true,
        data: {
          configData: response.data,
        },
      });
      dialogRef.afterClosed().subscribe((result: any) => {
          this.dataSourceChangeSubject.next(config.id);
      });
    });
  }

  deleteDlg(config:any) {
    this.showDlg
      .showConfirm('آیا مایل به حذف تنظیمات موردنظر هستید؟', '')
      .subscribe((result) => {
        if (result === 'yes') {
          this.spinner.show();
          this.rep.delete('Config/Delete', config.id).subscribe((res) => {
            // this.dataSource = this.dataSource.filter(f => f.id !== id);
            this.spinner.hide();
            this.dataSourceChangeSubject.next(res);
            this.snack.showSuccess('تنظیمات مورنظر حذف شد');
          });
        }
      });
  }

  confidSubmit() {
    const dialogRef = this.dialog.open(AddConfigComponent, {
      width: '50%',
      height: 'auto',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result: any) => {
        this.dataSourceChangeSubject.next(result);
     });
  }

  
  createFilterChip(filterData: any) {
    var chips = [];
  
    if (filterData.year != undefined) {
      chips.push({ id: 1, name: filterData.year });
    }

    if (filterData.month != undefined) {
      chips.push({ id: 2, name: filterData.month });
    }

    return chips;
  }

  removeFilter(filter: any): void {
    switch (filter) {
      case 1:
        this.filterForm.year =undefined;
        break;
      case 2:
        this.filterForm.month=undefined;
        break;

      default:
        break;

    }

    this.searchFilter();
  }
 toggleExpansion(): void {
    this.isExpanded = !this.isExpanded;
  }

  closeDiv(): void {
    this.isExpanded = false;
    this.searchFilter();
  }
}

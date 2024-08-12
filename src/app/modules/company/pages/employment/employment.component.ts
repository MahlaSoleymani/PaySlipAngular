import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { Observable, Subject, catchError, map, merge, startWith, switchMap } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { ShowMessageDialogService } from 'src/app/core/services/show-message-dialog.service';
import { RepositoryService } from 'src/app/core/http/repository.service';
import { MatDialog } from '@angular/material/dialog';
import { CredentialsService } from 'src/app/core/authentication/credentials.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AddEmploymentComponent } from '../add-employment/add-employment.component';
import { EditEmploymentComponent } from '../edit-employment/edit-employment.component';
import { DetailsEmploymentComponent } from '../details-employment/details-employment.component';


@Component({
  selector: 'app-employment',
  templateUrl: './employment.component.html',
  styleUrls: ['./employment.component.scss'],
})
export class EmploymentComponent {
  displayedColumns: string[] = [
    'personFullName',
    'personnelCode',
    'startWork',
    'endWork',
    'action',
  ];
  totalRecords = 0;

  isExpanded = false;

  showAddText:boolean;

  filterForm = {
    search: undefined,
    after: undefined,
    before:undefined,
  };
  filterChips: any[];

  dataSource = new MatTableDataSource<any>();
  dataSourceChangeSubject = new Subject();

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    // private showDlg: ShowMessageDialogService,
    private rep: RepositoryService,
    private dialog: MatDialog,
    public credit: CredentialsService,
    // private showDlg: ShowMessageDialogService,
    // private snack: SnackbarService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {}
  ngAfterViewInit() {
    this.searchFilter();
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
            'Employment/Get' +
              this.rep.generatePaginateion(
                this.paginator.pageIndex,
                this.paginator?.pageSize,
                this.sort.active,
                this.sort.direction,
                
                'search',
                this.filterForm.search,
                'after', this.filterForm.after,
                'before',this.filterForm.before
              )
          );
        }),
        map((res: any) => {
          this.spinner.hide();
        
          return res;
        }),
        catchError(() => {
          this.spinner.hide();
          return '';
        })
      )
      .subscribe((res: any) => {
        console.log(res.totalRecord);
        this.totalRecords = res.totalRecord;
        this.dataSource = res.data;
      });
  }

  edit(emp: any) {
    this.rep.get('Employment/GetForEdit', emp.id).subscribe((response: any) => {
      const dialogRef = this.dialog.open(EditEmploymentComponent, {
        width: '50%',
        height: 'auto',
        disableClose: true,
        data: {
          empData: response.data,
        },
      });

      dialogRef.afterClosed().subscribe((result: any) => {
        this.dataSourceChangeSubject.next(emp.id);
      });
    });
  }

  personnelSubmit() {
    const dialogRef = this.dialog.open(AddEmploymentComponent, {
      width: '50%',
      height: 'auto',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.dataSourceChangeSubject.next(result);
    });
  }

  GetDetails(emp: any) {
    this.rep
      .get('Employment/Details?employmentId=' + emp.id + '&personId=0')
      .subscribe((res: any) => {
        const dialogRef = this.dialog.open(DetailsEmploymentComponent, {
          width: '50%',
          height: '40%',
          data: {
            emp: res.data,
          },
        });
        // console.log(res.data)
      });
  }
 
  createFilterChip(filterData: any) {
    var chips = [];

    if (filterData.after != undefined) {
      chips.push({ id: 1, name: filterData.after });
    }

    if (filterData.before != undefined) {
      chips.push({ id: 2, name: filterData.before });
    }

    return chips;
  }

  removeFilter(filter: any): void {
    switch (filter) {
      case 1:
        this.filterForm.after=undefined;
        break;
      case 2:
        this.filterForm.before=undefined;
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
}

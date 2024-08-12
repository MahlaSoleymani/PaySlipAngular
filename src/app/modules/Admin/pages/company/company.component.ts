import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject, catchError, map, merge, startWith, switchMap } from 'rxjs';
import { CredentialsService } from 'src/app/core/authentication/credentials.service';
import { RepositoryService } from 'src/app/core/http/repository.service';
import { ShowMessageDialogService } from 'src/app/core/services/show-message-dialog.service';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { AddCompanyComponent } from '../add-company/add-company.component';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent {
  displayedColumns: string[] = [
    'name',
    'companyType',
    'postalCode',
    // 'logo',
    'action',
  ];
  totalRecords = 0;

  filterForm=
  {
    search: undefined,

  };

  dataSource = new MatTableDataSource<any>();
  dataSourceChangeSubject = new Subject();

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private showDlg: ShowMessageDialogService,
    private rep: RepositoryService,
    private dialog: MatDialog,
    public credit: CredentialsService,
    // private showDlg: ShowMessageDialogService,
    private snack: SnackbarService,
    private spinner: NgxSpinnerService
  ) {}

  ngAfterViewInit() {
    this.searchFilter();
  }

  searchFilter() {
    this.spinner.show();

    // this.filterChips = this.createFilterChip(this.filterForm);

    merge(
      this.sort.sortChange,
      this.paginator.page,
      this.dataSourceChangeSubject
    )
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.rep.get(
            'Company/Get' +
              this.rep.generatePaginateion(
                this.paginator.pageIndex,
                this.paginator.pageSize,
                this.sort.active,
                this.sort.direction,
                'search',
                this.filterForm.search,
                'companyType', 0
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
        console.log(res);
        this.dataSource = res;
      });
  }

  
  addCompany() {
    const dialogRef = this.dialog.open(AddCompanyComponent ,{
      width:'50%',
      height:'50%'
    })
  }

  removeFilter(id) {}

  edit(element){}

  GetDetails(element){}
}

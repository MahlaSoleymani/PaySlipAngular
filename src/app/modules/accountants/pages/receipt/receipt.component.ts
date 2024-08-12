import { Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, catchError, map, merge, raceWith, startWith, switchMap } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RepositoryService } from 'src/app/core/http/repository.service';
import { MatDialog } from '@angular/material/dialog';
import { CredentialsService } from 'src/app/core/authentication/credentials.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { ShowMessageDialogService } from 'src/app/core/services/show-message-dialog.service';
import { EditReceiptComponent } from '../edit-receipt/edit-receipt.component';
import { AddReceiptComponent } from '../add-receipt/add-receipt.component';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss'],
})
export class ReceiptComponent {
  displayedColumns: string[] = [
    'fullName',
    'year',
    'month',
    'action',
  ];

  years: Number[];
  months: Number[];

  @Input() yearFrom: number = 1350;
  @Input() yearTo: number = 1403;

  ngOnInit(): void {
    this.years = Array(this.yearTo - this.yearFrom + 1).fill(0).map((e, i) => this.yearTo - i);
    this.months = Array(12).fill(0).map((e, i) => i + 1);
  }

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  totalRecords = 8;

  isExpanded = false;

  showAddText:boolean;

  filterForm = {
    search: undefined,
    year: undefined,
    month: undefined,
  };

  filterChips: any[];

  dataSource = new MatTableDataSource<any>();
  dataSourceChangeSubject = new Subject();

  constructor(
    private showDlg: ShowMessageDialogService,
    private rep: RepositoryService,
    private dialog: MatDialog,
    public credit: CredentialsService,
    // private showDlg: ShowMessageDialogService,
    private snack: SnackbarService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) { }

  ngAfterViewInit() {
    this.searchFilter();
  }

  showAll() {
    this.filterForm = {
      search: undefined,
      year: undefined,
      month: undefined,
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
            'Receipt/Get' +
            this.rep.generatePaginateion(
              this.paginator.pageIndex,
              this.paginator.pageSize,
              this.sort.active,
              this.sort.direction,
              'search',
              this.filterForm.search,
              'year',
              this.filterForm.year,
              'month',
              this.filterForm.month
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

  edit(receipt: any) {
    this.rep.get('Receipt/Get', receipt.id).subscribe((response: any) => {     
      const dialogRef = this.dialog.open(EditReceiptComponent, {
        width: '75%',
        height: '65%',
        disableClose: true,
        data: {
          receiptData: response.data,
        },
      });
      dialogRef.afterClosed().subscribe((result: any) => {

        this.dataSourceChangeSubject.next(receipt.id);

      });
    });
  }

  deleteDlg(receipt: any) {
    this.showDlg
      .showConfirm('آیا مایل به حذف فیش موردنظر هستید؟', '')
      .subscribe((result) => {
        if (result === 'yes') {
          this.spinner.show();
          this.rep.delete('Receipt/Delete', receipt.id).subscribe((res) => {
            // this.dataSource = this.dataSource.filter(f => f.id !== id);
            this.spinner.hide();
            this.dataSourceChangeSubject.next(res);
            this.snack.showSuccess('فیش مورنظر حذف شد');
          });
        }
      });
  }

  Submit() {
    const dialogRef = this.dialog.open(AddReceiptComponent, {
      width: '73%',
      height: '70%',
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

  download(id){
    this.rep.post('Receipt/AddPdf?id='+ id +'&mrtName='+'Report.mrt', null).subscribe((res: any) => {
    if(res.isSuccess){
      this.rep.get('Receipt/GetReport' , res.data , { responseType: "blob" }).subscribe((response: any) => {
        let dataType = response.type;
        let binaryData = [];
        binaryData.push(response);
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: dataType }));
        downloadLink.setAttribute('download', 'export_pdf_file.pdf');
        document.body.appendChild(downloadLink);
        downloadLink.click();
      })
    }
    });
  }

  toggleExpansion(): void {
    this.isExpanded = !this.isExpanded;
  }

  closeDiv(): void {
    this.isExpanded = false;
    this.searchFilter();
  }
}

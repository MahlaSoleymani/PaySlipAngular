import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IColumn, IRowItem } from '../../models/core/ITable';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  @Input() columns: IColumn[];
  @Input() rows: IRowItem[][] = [];
  @Input() actions: any;

  @Output() onEdit = new EventEmitter<string>();
  @Output() onDelete = new EventEmitter<string>();
  @Output() onAction = new EventEmitter<string>();

  constructor(
    private alert: AlertService
  ) {
  }

  ids: any[] = [];


  ngOnInit(): void {
  }


  toggleAll(event) {
    if(event.target.checked){
      this.ids = this.rows.map(r => {
        return r.find(item => item.Type === 'id')?.Value ?? 0;
      });
    }else{
      this.ids = [];
    }
  }

  selectRow(rowItems: IRowItem[]) {
    let id = rowItems.find(r => r.Type === 'id')?.Value ?? 0;
    if (typeof id === "number") {
      let isSelectedBefore = this.ids.findIndex(i => i === id);
      if (isSelectedBefore >= 0) {
        this.ids.splice(isSelectedBefore, 1);
      } else {
        this.ids.push(id);
      }
    }
  }
  action(row){
    const id = row.find(r => r.Type == 'id').Value;
    this.onAction.emit(id);
  }
  edit(row){
    const id = row.find(r => r.Type == 'id').Value;
    this.onEdit.emit(id);
  }
  delete(row){
    this.alert.errorSync({})
      .then(res => {
        if (res.isConfirmed) {
          const id = row.find(r => r.Type == 'id').Value;
          this.onDelete.emit(id);
        }
      }).catch(err => console.log(err))
  }

}

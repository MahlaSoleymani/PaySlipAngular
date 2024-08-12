export interface IColumn {
  Title: string;
}

export interface IRowItem {
  Type: RowTypes;
  Value: string | number;
}

export enum RowTypes {
  Text = 'text',
  Id = 'id',
  Badge = 'badge',
  SuccessBadge = 'successBadge',
  ErrorBadge = 'errorBadge',
  WarningBadge = 'warningBadge',
}

export class Column implements IColumn {
  Title: string;

  constructor(title: string) {
    this.Title = title;
  }
}

export class RowItem implements IRowItem {
  Type: RowTypes;
  Value: string | number;

  constructor(type: RowTypes, value: string | number) {
    this.Type = type;
    this.Value = value;
  }


}

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  output,
  viewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource,
} from '@angular/material/table';

import { TableColumnModel } from '../../models';

@Component({
  selector: 'app-table',
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatPaginator,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRowDef,
    MatRowDef,
    MatSort,
    MatSortModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent<T> implements AfterViewInit {
  paginator = viewChild<MatPaginator>(MatPaginator);

  displayedColumns = input<TableColumnModel[]>([]);
  data = input<T[]>([]);

  sortChange = output<Sort>();

  displayedColumnsStrings = computed(() =>
    this.displayedColumns().map((el) => el.id),
  );

  dataSource = new MatTableDataSource<T>([]);

  constructor() {
    effect(() => {
      const data = this.data();

      if (data) {
        this.dataSource.data = data;
        this.initPaginator();
      }
    });
  }

  ngAfterViewInit(): void {
    this.initPaginator();
  }

  private initPaginator(): void {
    this.dataSource.paginator = this.paginator();
  }
}

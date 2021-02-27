import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { ViewOptions } from '@app/helpers/view-options';

import { Item } from '@app/models';
import { ItemService } from '@app/services';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent implements OnInit {
  items: Item[] = [];
  tableColumns: string[] = ['index', 'name', 'price', 'realPrice', 'count'];
  resultsLength = 0;
  pagesize = 10;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.refresh(this.getDefaultOptions());
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe((sort: Sort) => {
      console.log('sortChange', this.sort.active);
      this.paginator.pageIndex = 0;
      this.refresh(this.getCurrentOptions());
    });

    this.paginator.page.subscribe((page: PageEvent) => {
      console.log('paginator ', page);
      this.refresh(this.getCurrentOptions());
    });
  }

  refresh(options: ViewOptions) {
    this.itemService.fetchAllWithOptions(options).subscribe({
      next: (items) => {
        this.resultsLength = items.length;
        this.items = items;
      },
      error: error => {
        console.log(error)
      }
    });
  }

  getCurrentOptions() {
    const options: ViewOptions = {
      sortField: this.sort.active,
      sortDirection: this.sort.direction,
      page: this.paginator.pageIndex,
      pageSize: this.paginator.pageSize
    };

    return options;
  }

  getDefaultOptions() {
    const options: ViewOptions = {
      sortField: 'name',
      sortDirection: 'asc',
      page: 0,
      pageSize: this.pagesize
    };

    return options;
  }
}

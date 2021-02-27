import { Component, OnInit, ViewChild, ViewChildren, AfterViewInit, QueryList } from '@angular/core';
// import { Observable, merge, of } from 'rxjs';
// import { catchError, map, startWith, switchMap } from 'rxjs/operators';


// import from the folder
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Item } from '@app/models';
import { ItemService } from '@app/services';
import { ViewOptions } from '@app/helpers/view-options';

@Component({
  selector: 'app-items-list-test',
  templateUrl: './items-list-test.component.html',
  styleUrls: ['./items-list-test.component.scss']
})
export class ItemsListTestComponent implements OnInit {

  items: Item[] = [];
  tableColumns: string[] = ['index', 'name', 'price', 'realPrice', 'count'];
  resultsLength = 0;
  pagesize = 10;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private service: ItemService) {
  }

  refresh(options: ViewOptions) {
    this.service.fetchAllWithOptions(options).subscribe({
      next: (items) => {
        this.resultsLength = items.length;
        this.items = items;
      },
      error: error => {
        console.log(error)
      }
    });
  }

  ngOnInit() {
    // default data
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

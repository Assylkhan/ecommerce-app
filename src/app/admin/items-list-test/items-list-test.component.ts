import { Component, OnInit, ViewChild, ViewChildren, AfterViewInit, QueryList } from '@angular/core';
import { BooksService } from '../books.service';
import { Observable, merge, of } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';


// import from the folder!!
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Item } from '@app/models';
import { ItemService } from '@app/services';

@Component({
  selector: 'app-items-list-test',
  templateUrl: './items-list-test.component.html',
  styleUrls: ['./items-list-test.component.scss']
})
export class ItemsListTestComponent implements OnInit {

  data: Item[] = [];
  tableColumns: string[] = ['name', 'author', 'year'];
  resultsLength = 0;
  pagesize = 10;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private service: ItemService) {
  }

  refresh() {
    this.service.fetchAll().subscribe((result) => {
      this.resultsLength = result.total;
      this.data = result;
    });
  }

  ngOnInit() {

    // default data
    this.refresh(this.getDefaultOptions());

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

interface ViewOptions {
  sortField: string;
  sortDirection: string;
  page: number;
  pageSize: number;
}
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { User } from '@app/models';
import { UserService } from '@app/services';
import { ViewOptions } from '@app/helpers/view-options';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {
  users: User[];

  tableColumns: string[] = ['index', 'firstName', 'lastName', 'email', 'role'];
  resultsLength = 0;
  pagesize = 10;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private userService: UserService
  ) { }

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
    this.userService.fetchAllWithOptions(options).subscribe({
      next: (users) => {
        this.resultsLength = users.length;
        this.users = users;
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

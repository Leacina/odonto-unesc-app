import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { take, takeUntil } from 'rxjs/operators';

import { UserService } from './../../../../core/services/user.service';
import { GRID_PAGINATION_LIMIT, GridComponent, GridState } from './../../../../shared/components/grid/grid';

@Component({
  selector: 'app-users-grid',
  templateUrl: './users-grid.component.html',
  styleUrls: ['./users-grid.component.scss']
})
export class UsersGridComponent extends GridComponent implements OnInit {

  @ViewChild('actions', { static: true }) actions: TemplateRef<any>;
  @ViewChild('manager', { static: true }) manager: TemplateRef<any>;
  @ViewChild('active', { static: true }) active: TemplateRef<any>;

  constructor(private userService: UserService, private router: Router) {
    super();
  }

  ngOnInit() {
    // Grid settings
    this.grid = {
      columns: [
        {
          name: 'name',
          header: 'Nome',
          binding: 'name',
          sortActive: true
        },
        {
          name: 'manager',
          header: 'Gerente',
          binding: this.manager,
          sortActive: true,
          sortId: 'manager'
        },
        {
          name: 'active',
          header: 'Ativo',
          binding: this.active,
          sortActive: true,
          sortId: 'active'
        },
        {
          name: 'actions',
          header: 'Ações',
          binding: this.actions,
          headerCssClass: 'odonto-grid-actions-column',
        }
      ],
      paging: {
        page: 1,
        limit: GRID_PAGINATION_LIMIT
      },
      sorting: {
        default: {
          column: 'name',
          direction: 'asc'
        },
        additional: [
          {
            column: 'name',
            direction: 'asc'
          }
        ]
      }
    };

    // Load data for the first time
    this.updateGridData(this.getQueryParamsFromGrid(this.grid));
  }

  onGridStateChange(state: GridState) {
    this.updateGridData(state);
  }

  onAction(action: string, index: number, id: number) {
    switch (action) {
      case 'new':
        this.router.navigate([`/admin/users/create`]);
        break;
      case 'edit':
        this.router.navigate([`/admin/users/update/${id}`]);
        break;
    }
  }

  private updateGridData(state: GridState): void {
    this.busy = true;

    this.userService.query(state)
      .pipe(
        take(1),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((resp) => {
        this.busy = false;

        this.data.next(resp);
        this.data.asObservable();
      });
  }
}

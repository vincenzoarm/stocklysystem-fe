import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CategoryService } from '../../services/category.service';

import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { LoginService } from '../../auth/login.service';

@Component({
  selector: 'app-category-table',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    RouterOutlet,
  ],
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
  templateUrl: './category-table.component.html',
  styleUrl: './category-table.component.css',
})
export class CategoryTableComponent implements OnInit {
  dataSource: any;
  columnsToDisplay = ['category_id', 'name'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: Category | null | undefined;
  isButtonVisible: any;

  constructor(
    private categoryService: CategoryService,
    private loginService: LoginService
  ) {
    this.isButtonVisible = this.loginService.isAdminUser();
  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data) => {
      this.dataSource = data;
      console.log(this.dataSource);
    });
  }

  edit(element: Category) {
    console.log('EDIT: id:' + element.category_id + ' name:' + element.name);
    //Si deve aprire un form sotto con routeroutlet per modificare la categoria
  }

  remove(element: Category) {
    console.log('REMOVE: ' + element);
    this.categoryService.removeCategory(element.category_id).subscribe();
    // window.location.reload();
  }
}

export interface Category {
  category_id: number;
  name: string;
}

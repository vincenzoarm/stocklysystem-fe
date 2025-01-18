import { Component } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { CategoryTableComponent } from '../category-table/category-table.component';

@Component({
  selector: 'app-categories',
  imports: [NavComponent, CategoryTableComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent {}

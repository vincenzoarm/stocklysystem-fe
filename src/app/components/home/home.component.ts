import { Component } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { ProductCategoryTableComponent } from '../product-category-table/product-category-table.component';

@Component({
  selector: 'app-home',
  imports: [NavComponent, ProductCategoryTableComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}

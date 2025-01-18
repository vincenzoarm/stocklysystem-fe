import { Component } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { ProductTableComponent } from '../product-table/product-table.component';

@Component({
  selector: 'app-products',
  imports: [NavComponent, ProductTableComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {}

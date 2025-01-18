import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CurrencyPipe } from '@angular/common';
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
import {
  ActivatedRoute,
  ParamMap,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { LoginService } from '../../auth/login.service';

@Component({
  selector: 'app-product-table',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    RouterOutlet,
    RouterModule,
    CurrencyPipe,
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
  templateUrl: './product-table.component.html',
  styleUrl: './product-table.component.css',
})
export class ProductTableComponent implements OnInit {
  dataSource: any;
  columnsToDisplay = ['product_id', 'name', 'price', 'description'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: Product | null | undefined;
  isButtonVisible: any;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private loginService: LoginService
  ) {
    this.isButtonVisible = this.loginService.isAdminUser();
  }

  ngOnInit(): void {
    this.loadProductData();
  }

  /**
   * Carica i prodotti dal product service e li assegna al dataSource.
   */

  loadProductData() {
    this.productService.getProducts().subscribe((data: any) => {
      this.dataSource = data;
    });
  }

  /**
   * Rimuove un prodotto dal database.
   * @param element prodotto da rimuovere. Il product_id e' l'id del prodotto da rimuovere.
   */
  remove(element: Product) {
    console.log('REMOVE: ' + element.product_id);
    this.productService.removeProduct(element.product_id).subscribe();
    window.location.reload();
  }
}

export interface Product {
  product_id: number;
  name: string;
  description: string;
  price: number;
  category: number;
}

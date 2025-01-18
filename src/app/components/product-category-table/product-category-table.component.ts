import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../../services/general.service';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-product-category-table',
  imports: [MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './product-category-table.component.html',
  styleUrl: './product-category-table.component.css',
})
export class ProductCategoryTableComponent implements OnInit {
  dataSource: any;
  displayedColumns: string[] = [
    'Codice prodotto',
    'Nome',
    'Descrizione',
    'Prezzo',
    'Categoria',
  ];
  constructor(private generalService: GeneralService) {}

  ngOnInit(): void {
    this.generalService.getGeneralData().subscribe((data) => {
      this.dataSource = data;
      console.log(this.dataSource);
    });
  }
}

export interface ProductAndCategory {
  product_id: number;
  product_name: string;
  product_description: string;
  product_price: number;
  product_category: number;
  category_id: number;
  category_name: string;
}

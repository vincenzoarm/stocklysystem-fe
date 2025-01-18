import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Product, ProductService } from '../../services/product.service';
import { Category, CategoryService } from '../../services/category.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent implements OnInit {
  addForm: FormGroup = null!;
  product: Product = null!;
  categories: any;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router
  ) {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }
  ngOnInit(): void {
    this.addForm = new FormGroup({
      name: new FormControl(''),
      description: new FormControl(''),
      price: new FormControl(null),
      category: new FormControl(null),
    });
  }

  onSubmit() {
    let prod: Product = {
      id: undefined!,
      name: this.addForm.value.name,
      description: this.addForm.value.description,
      price: this.addForm.value.price,
      category: this.addForm.value.category,
    };

    // console.log(this.addForm.value);
    this.productService.addProduct(prod).subscribe();
    this.router.navigate(['/products']);
  }

  reset() {
    this.addForm.patchValue({
      name: '',
      description: '',
      price: null,
      category: null,
    });
  }
}

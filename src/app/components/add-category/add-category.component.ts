import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add-category',
  imports: [
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css',
})
export class AddCategoryComponent implements OnInit {
  addForm: FormGroup = null!;

  constructor(
    private categoryService: CategoryService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.addForm = new FormGroup({
      name: new FormControl(''),
    });
  }

  onSubmit() {
    this.categoryService.addCategory(this.addForm.value).subscribe();
    this.route.navigate(['/categories']);
  }

  reset() {
    this.addForm.reset();
  }
}

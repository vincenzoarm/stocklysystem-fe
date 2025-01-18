import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Category } from '../../services/category.service';

@Component({
  selector: 'app-edit-category',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css',
})
export class EditCategoryComponent implements OnInit {
  updateForm: FormGroup = null!;
  id_category: number = null!;

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.updateForm = new FormGroup({
      name: new FormControl(''),
    });

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id_category = +params.get('id')!;
      console.log(this.id_category);
      this.categoryService
        .getCategory(this.id_category)
        .subscribe((data: any) => {
          console.log(data);
          this.updateForm.patchValue({
            name: data.name,
          });
        });
    });
  }

  onSubmit() {
    let tmp: Category = {
      id: this.id_category,
      name: this.updateForm.value.name,
    };
    this.categoryService.updateCategory(tmp).subscribe();
    this.router.navigate(['/categories']);
  }

  reset() {
    this.updateForm.reset();
  }
}

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Category, CategoryService } from '../../services/category.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-product',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css',
})
export class EditProductComponent implements OnInit {
  updateForm: FormGroup = null!;
  product: any;
  id_param: number = 0;
  categories: any;

  /**
   * @constructor
   * @param productService Servizio usato per interagire con l'endpoint dei prodotti.
   * @param route Servizio usato per prende l'id del prodotto da modificare.
   * @param categoryService Servizio usato per interagire con l'endpoint delle categorie.
   * @param router Servizio usato per navigare tra le rotte.
   *
   * Sottoscrivi i servizi di rotta per ottenere l'id del prodotto da modificare.
   *
   *
   */
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router
  ) {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  /**
   * Questa funzione viene chiamata quando il componente viene inizializzato.
   * Crea un nuovo formGroup con i campi name, description, price e category.
   * Sottoscrive il servizio di rotta per ottenere l'id del prodotto da modificare.
   * Chiama la funzione loadProductData() per caricare i dati del prodotto da modificare.
   */
  ngOnInit(): void {
    this.updateForm = new FormGroup({
      name: new FormControl(''),
      description: new FormControl(''),
      price: new FormControl(null),
      category: new FormControl(null),
    });

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id_param = +params.get('id')!;
      this.loadProductData();
    });
  }

  /**
   * Quando il form viene submittato, viene chiamata questa funzione.
   * Fa una chiamata REST al server per aggiornare il prodotto con i nuovi valori del form.
   * Quando la chiamata è pronta si naviga verso l'altra rotta
   */
  onSubmit() {
    console.log(this.updateForm.value);
    this.productService
      .updateProduct(this.id_param, this.updateForm.value)
      .subscribe((data) => {
        console.log(data);
      });
    this.router.navigate(['/products']);
  }

  /**
   * Funzione che viene chiamata una volta che il componente e' stato inizializzato.
   * Fa una chiamata REST al server per ottenere i dati del prodotto da modificare.
   * Quando la chiamata REST e' pronta, i valori del prodotto vengono settati nel form.
   */
  loadProductData(): void {
    this.productService.getProduct(this.id_param).subscribe((data) => {
      this.product = data;
      this.updateForm.patchValue({
        name: this.product.name,
        description: this.product.description,
        price: this.product.price,
        category: this.product.category,
      });
    });
  }

  reset() {
    this.updateForm.patchValue({
      name: '',
      description: '',
      price: null,
      category: null,
    });
  }
}

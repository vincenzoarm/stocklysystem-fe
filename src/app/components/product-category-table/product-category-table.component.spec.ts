import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCategoryTableComponent } from './product-category-table.component';

describe('ProductCategoryTableComponent', () => {
  let component: ProductCategoryTableComponent;
  let fixture: ComponentFixture<ProductCategoryTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCategoryTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCategoryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

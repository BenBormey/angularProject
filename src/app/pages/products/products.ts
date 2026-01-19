import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../services/product';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.html',
  styleUrls: ['./products.css'],
})
export class Products {
  products: any[] = [];
  categories: any[] = [];

  product = {
    categoryId: 0,
    productName: '',
    description: '',
    basePrice: 0,
    isActive: true,
    createdAt: new Date().toISOString()
  };

  constructor(private productApi: Product) {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts() {
    this.productApi.getProducts().subscribe({
      next: (res) => {
        this.products = res;
      },
      error: (err) => console.error(err)
    });
  }

  loadCategories() {
    this.productApi.getCategories().subscribe({
      next: (res) => {
        this.categories = res;
      },
      error: (err) => console.error(err)
    });
  }

  save() {
    this.productApi.addProduct(this.product).subscribe({
      next: () => {
        alert('Product added successfully!');
        this.reset();
        this.loadProducts();
      },
      error: (err) => {
        console.error(err);
        alert('Error adding product');
      }
    });
  }

  reset() {
    this.product = {
      categoryId: 0,
      productName: '',
      description: '',
      basePrice: 0,
      isActive: true,
      createdAt: new Date().toISOString()
    };
  }
}

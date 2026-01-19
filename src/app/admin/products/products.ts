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
    categoryName :'',
    isActive: true,
    createdAt: new Date().toISOString()
  };

  constructor(private productApi: Product) {
    this.loadCategories();
    this.loadProducts();
  }

  // Load categories
  loadCategories() {
    this.productApi.getCategories().subscribe({
      next: (res) => {
        this.categories = res;
      },
      error: (err) => console.error(err)
    });
  }

  // Load products
  loadProducts() {
    this.productApi.getProducts().subscribe({
      next: (res) => {
        this.products = res;
      },
      error: (err) => console.error(err)
    });
  }

  // Save product
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

  // Reset
  reset() {
    this.product = {
      categoryId: 0,
      productName: '',
      description: '',
      basePrice: 0,
      categoryName :'',
      isActive: true,
      createdAt: new Date().toISOString()
    };
  }
}

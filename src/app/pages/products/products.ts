import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../../services/product';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.html',
  styleUrls: ['./products.css'],
})
export class Products implements OnInit {
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

  constructor(
    private productApi: Product,
    private router: Router
  ) {}

  ngOnInit(): void {
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

  // ========== UI HELPERS ==========
  getFirstImage(p: any): string {
    if (p.variants?.length > 0) {
      for (let v of p.variants) {
        if (v.images && v.images.length > 0) {
          return v.images[0];
        }
      }
    }
    return 'https://via.placeholder.com/200';
  }

  getFirstPrice(p: any): number {
    if (p.variants?.length > 0) {
      const validVariant = p.variants.find((v: any) => v.price > 0);
      if (validVariant) return validVariant.price;
    }
    return p.basePrice;
  }

  goToDetail(id: number) {
    this.router.navigate(['/products', id]);
  }

  // ========== ADD PRODUCT ==========
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

  addToCart(p: any) {
    console.log('Add to cart:', p);
  }
}

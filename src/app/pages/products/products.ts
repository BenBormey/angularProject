import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../../services/product';
import { Branchservice } from '../../services/branchservice';

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
  branches: any[] = [];

  // Filter States
  selectedCategory: number = 0;
  selectedBranch: number = 0;
  selectedColor: string = '';
  selectedSize: string = '';

  constructor(
    private productApi: Product,
    private branchService: Branchservice,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
    this.loadBranches();
  }

  loadProducts() {
    this.productApi.getProducts().subscribe({
      next: (res) => this.products = res,
      error: (err) => console.error(err)
    });
  }

  loadCategories() {
    this.productApi.getCategories().subscribe({
      next: (res) => this.categories = res,
      error: (err) => console.error(err)
    });
  }

  loadBranches() {
    this.branchService.getBranch().subscribe({
      next: (res) => this.branches = res,
      error: (err) => console.error(err)
    });
  }

  // មុខងារ Filter តាម Category ចេញពី API
  applyCategoryFilter() {
    if (this.selectedCategory == 0) {
      this.loadProducts();
    } else {
      this.productApi.getProductsByCategory(this.selectedCategory).subscribe({
        next: (res) => this.products = res,
        error: (err) => console.error(err)
      });
    }
  }

  resetFilters() {
    this.selectedCategory = 0;
    this.selectedBranch = 0;
    this.selectedColor = '';
    this.selectedSize = '';
    this.loadProducts();
  }

  getFirstImage(p: any): string {
    if (p.variants?.length > 0) {
      for (let v of p.variants) {
        if (v.images && v.images.length > 0) return v.images[0];
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
}
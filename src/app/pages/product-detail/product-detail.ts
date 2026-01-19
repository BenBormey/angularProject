import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Product } from '../../services/product';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.html',
  styleUrls: ['./product-detail.css'],
})
export class ProductDetail implements OnInit {

  product: any = null;
  loading = true;

  selectedVariant: any = null;
  selectedImage: string = '';

  finalPrice: number = 0;
  discountAmount: number = 0;
  taxAmount: number = 0;

  constructor(
    private route: ActivatedRoute,
    private productService: Product
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadDetail(Number(id));
    }
  }

  loadDetail(id: number) {
    this.productService.getProductDetails(id).subscribe({
      next: (res) => {
        this.product = res;
        this.loading = false;

        if (this.product?.variants?.length > 0) {
          this.selectVariant(this.product.variants[0]);
        }
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  selectVariant(variant: any) {
    this.selectedVariant = variant;
    this.selectedImage = variant.images?.[0] || '';
    this.calculateFinalPrice();
  }

  selectImage(img: string) {
    this.selectedImage = img;
  }

  // ================================
  // FIXED PRICE LOGIC
  // ================================
  calculateFinalPrice() {
    if (!this.selectedVariant) return;

    const price = this.selectedVariant.price;

    const activeDiscounts =
      this.product?.discounts?.filter((d: any) => d.isActive) || [];

    const activeTaxes =
      this.product?.taxes?.filter((t: any) => t.isActive) || [];

    // Reset
    this.discountAmount = 0;
    this.taxAmount = 0;

    // ----- APPLY DISCOUNTS -----
    activeDiscounts.forEach((d: any) => {
      if (d.discountType === 'Percent') {
        this.discountAmount += (price * d.discountValue) / 100;
      } else if (d.discountType === 'Fixed') {
        this.discountAmount += d.discountValue;
      }
    });

    let afterDiscount = price - this.discountAmount;

    // ----- APPLY TAXES -----
    activeTaxes.forEach((t: any) => {
      this.taxAmount += (afterDiscount * t.taxRate) / 100;
    });

    this.finalPrice = afterDiscount + this.taxAmount;

    // Safety: never show negative price
    if (this.finalPrice < 0) {
      this.finalPrice = 0;
    }
  }
}

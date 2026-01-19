import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductVariantService } from '../../services/variantsservice';

@Component({
  selector: 'app-variants',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './variants.html',
  styleUrl: './variants.css',
})
export class Variants {
  variants: any[] = [];

  variant = {
    productVariantId: 0,
    variantName: '',
    color: '',
    size: '',
    price: 0,
    stock: 0,
    sku: ''
  };

  isEditMode = false;

  constructor(private api: ProductVariantService) {
    this.loadVariants();
  }

  // LOAD ALL
  loadVariants() {
    this.api.getAll().subscribe({
      next: (res: any[]) => {
        this.variants = res;
      },
      error: (err: any) => console.error(err)
    });
  }

  // SAVE (CREATE / UPDATE)
  saveVariant() {
    if (this.isEditMode) {
      this.api.update(this.variant.productVariantId, this.variant).subscribe({
        next: () => {
          this.resetForm();
          this.loadVariants();
        },
        error: (err: any) => console.error(err)
      });
    } else {
      this.api.create(this.variant).subscribe({
        next: () => {
          this.resetForm();
          this.loadVariants();
        },
        error: (err: any) => console.error(err)
      });
    }
  }

  // EDIT
  editVariant(v: any) {
    this.variant = { ...v };
    this.isEditMode = true;
  }

  // DELETE
  deleteVariant(id: number) {
    if (confirm('Are you sure you want to delete?')) {
      this.api.delete(id).subscribe({
        next: () => {
          this.loadVariants();
        },
        error: (err: any) => console.error(err)
      });
    }
  }

  // RESET FORM
  resetForm() {
    this.variant = {
      productVariantId: 0,
      variantName: '',
      color: '',
      size: '',
      price: 0,
      stock: 0,
      sku: ''
    };
    this.isEditMode = false;
  }
}

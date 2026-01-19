import { Component } from '@angular/core';
import { CategoryService } from '../../services/categoryservice';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './category.html',
  styleUrl: './category.css',
})
export class Category {
  categorys: any[] = [];

  category = {
    categoryId: 0,
    categoryName: '',
    status: true
  };

  isEditMode = false;

  constructor(private categoryApi: CategoryService) {
    this.loadCategories();
  }

  // LOAD
  loadCategories() {
    this.categoryApi.getCategories().subscribe({
      next: (res: any[]) => {
        this.categorys = res;
      },
      error: (err: any) => console.error(err)
    });
  }

  // SAVE (CREATE)
  saveCategory() {
    if (this.isEditMode) {
      this.updateCategory();
    } else {
      this.categoryApi.addCategory(this.category).subscribe({
        next: () => {
          this.resetForm();
          this.loadCategories();
        },
        error: (err: any) => console.error(err)
      });
    }
  }

  // EDIT
  editCategory(c: any) {
    this.category = { ...c };
    this.isEditMode = true;
  }

  // UPDATE
  updateCategory() {
    this.categoryApi.updateCategory(this.category.categoryId, this.category).subscribe({
      next: () => {
        this.resetForm();
        this.loadCategories();
      },
      error: (err: any) => console.error(err)
    });
  }

  // DELETE
  deleteCategory(id: number) {
    if (confirm('Are you sure you want to delete?')) {
      this.categoryApi.deleteCategory(id).subscribe({
        next: () => {
          this.loadCategories();
        },
        error: (err: any) => console.error(err)
      });
    }
  }

  // RESET
  resetForm() {
    this.category = {
      categoryId: 0,
      categoryName: '',
      status: true
    };
    this.isEditMode = false;
  }

  // DISPLAY STATUS
  getStatusText(status: boolean): string {
    return status ? 'Active' : 'Inactive';
  }
}

import { Component } from '@angular/core';
import { Branchservice } from '../../services/branchservice';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-branch',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './branch.html',
  styleUrl: './branch.css',
})
export class Branch {
  branches: any[] = [];

  branch = {
    branchId: 0,
    branchName: '',
    status: true
  };

  isEditMode = false;

  constructor(private branchApi: Branchservice) {
    this.loadBranches();
  }

  // LOAD
  loadBranches() {
    this.branchApi.getBranch().subscribe({
      next: (res: any[]) => {
        this.branches = res;
      },
      error: (err: any) => console.error(err)
    });
  }

  // SAVE
  saveBranch() {
    if (this.isEditMode) {
      this.updateBranch();
    } else {
      this.branchApi.addBranch(this.branch).subscribe({
        next: () => {
          this.resetForm();
          this.loadBranches();
        },
        error: (err: any) => console.error(err)
      });
    }
  }

  // EDIT
  editBranch(b: any) {
    this.branch = { ...b };
    this.isEditMode = true;
  }

  // UPDATE
  updateBranch() {
    this.branchApi.updateBranch(this.branch).subscribe({
      next: () => {
        this.resetForm();
        this.loadBranches();
      },
      error: (err: any) => console.error(err)
    });
  }

  // DELETE
  deleteBranch(id: number) {
    if (confirm('Are you sure you want to delete?')) {
      this.branchApi.deleteBranch(id).subscribe({
        next: () => {
          this.loadBranches();
        },
        error: (err: any) => console.error(err)
      });
    }
  }

  // RESET
  resetForm() {
    this.branch = {
      branchId: 0,
      branchName: '',
      status: true
    };
    this.isEditMode = false;
  }

  getStatusText(status: boolean): string {
    return status ? 'Active' : 'Inactive';
  }
}

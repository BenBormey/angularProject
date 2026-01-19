import { Component, OnInit } from '@angular/core';
import { Taxservice } from '../../services/taxservice'; // adjust path
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tax',
  templateUrl: './tax.html',
  imports:[CommonModule,FormsModule],
  styleUrl: './tax.css',
})
export class Tax implements OnInit {
  taxes: any[] = [];

  newTax = {
    taxName: '',
    taxRate: 0,
    isActive: true,
  };

  editTax: any = null;

  constructor(private taxService: Taxservice) {}

  ngOnInit(): void {
    this.loadTaxes();
  }

  // GET ALL
  loadTaxes() {
    this.taxService.getTax().subscribe({
      next: (data) => {
        this.taxes = data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  // CREATE
createTax() {
  this.taxService.createTax(this.newTax).subscribe({
    next: () => {
      alert('Tax created successfully');

      setTimeout(() => {
        this.loadTaxes();   // 👈 force reload
      }, 300);

      this.resetForm();
    },
    error: (err) => {
      console.error(err);
    },
  });
}


  // SET EDIT
  setEdit(tax: any) {
    this.editTax = { ...tax };
  }

  // UPDATE
  updateTax() {
    this.taxService.updateTax(this.editTax.taxId, this.editTax).subscribe({
      next: () => {
        alert('Tax updated successfully');
        this.loadTaxes();
        this.editTax = null;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  // DELETE
  deleteTax(id: number) {
    if (!confirm('Are you sure?')) return;

    this.taxService.deleteTax(id).subscribe({
      next: () => {
        alert('Deleted successfully');
        this.loadTaxes();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  // GET BY ID
  getById(id: number) {
    this.taxService.getTaxById(id).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  resetForm() {
    this.newTax = {
      taxName: '',
      taxRate: 0,
      isActive: true,
    };
  }
}

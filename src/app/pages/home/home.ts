import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Product } from '../../services/product';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {
  products: any[] = [];

  constructor(
    private router: Router,
    private productService: Product
  ) {}

  ngOnInit() {
    this.productService.getProducts().subscribe(res => {
      this.products = res;
    });
  }

  goToDetails(id: number) {
    this.router.navigate(['/product-details', id]);
  }
}

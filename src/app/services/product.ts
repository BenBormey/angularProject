import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Product {
  private apiUrl = 'http://localhost:5221/api/Product';

  constructor(private http: HttpClient) {}

  // ===================== PRODUCT LIST (1 product = 1 image) =====================
  getProducts() {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  // ===================== PRODUCT DETAIL (FULL DETAIL) =====================
  getProductDetails(id: any) {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // ===================== ADD PRODUCT =====================
  addProduct(data: any) {
    return this.http.post(this.apiUrl, data);
  }

  // ===================== UPDATE PRODUCT =====================
  updateProduct(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  // ===================== DELETE PRODUCT =====================
  deleteProduct(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // ===================== GET CATEGORIES =====================
  getCategories() {
    return this.http.get<any[]>('http://localhost:5221/api/Category');
  }
}

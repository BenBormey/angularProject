import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Product {
  // ប្រើប្រាស់ URL ដែលបានកំណត់ក្នុង Swagger របស់អ្នក
  private apiUrl = 'http://localhost:5221/api/Product';

  constructor(private http: HttpClient) {}

  // ===================== PRODUCT LIST =====================
  // ទាញយកបញ្ជីផលិតផលទាំងអស់
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // ===================== PRODUCT BY CATEGORY =====================
  // ទាញយកផលិតផលតាមប្រភេទ (Category)
  getProductsByCategory(categoryId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/category/${categoryId}`);
  }

  // ===================== PRODUCT DETAIL =====================
  getProductDetails(id: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // ===================== GET ALL CATEGORIES =====================
  getCategories(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:5221/api/Category');
  }

  // ===================== ADD PRODUCT =====================
  addProduct(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  // ===================== UPDATE PRODUCT =====================
  updateProduct(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  // ===================== DELETE PRODUCT =====================
  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
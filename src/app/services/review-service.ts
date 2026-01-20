import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private baseUrl = 'http://localhost:5221/api/review';

  constructor(private http: HttpClient) {}

  getByProductId(productId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/product/${productId}`);
  }

  getAverage(productId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/product/${productId}/average`);
  }

  getTotal(productId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/product/${productId}/count`);
  }

  create(review: any): Observable<any> {
    return this.http.post(this.baseUrl, review);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductVariantService {
  private apiUrl = 'http://localhost:5221/api/ProductVariants';
  private apiurl = '';

  constructor(private http: HttpClient) {}


getAll() {
  return this.http.get<any[]>('http://localhost:5221/api/ProductVariants?ID=5');
}


  
  getById(id: number) {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }


  create(data: any) {
    return this.http.post(this.apiUrl, data);
  }


  update(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
